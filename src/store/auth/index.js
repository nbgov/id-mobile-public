import { partial } from "lib/fns";
import { th } from "lib/th";
import * as api from "store/api";
import * as masterKey from "store/master-key";
import * as keys from "store/keys";
import { AuthApiIds } from "const";
import { hasMasterKey } from "store/master-key/selectors";

export const init = (app) => {
  for (const apiId of AuthApiIds) {
    const state = { signedIn: false, clientId: null };
    app.auth.states.set(apiId, state);

    connectListen(app, apiId);
    disconnectListen(app, apiId);
  }

  masterKey.onSet(app, signIn);
  masterKey.onUnset(app, signOut);
};

export const onSignedIn = (app, apiId, fn) => {
  const event = signedInEvent(apiId);
  return app.auth.events.on(event, partial(fn, app, apiId));
};

export const onSignedOut = (app, apiId, fn) => {
  const event = signedOutEvent(apiId);
  return app.auth.events.on(event, partial(fn, app, apiId));
};

const signIn = async (app) => authAction(app, apiSignIn);

const signOut = async (app) => authAction(app, apiSignOut);

const authAction = async (app, action) =>
  Promise.allSettled(AuthApiIds.map((apiId) => action(app, apiId)));

const apiSignIn = async (app, apiId) => {
  const state = getState(app, apiId);
  const authApi = getAuthApi(app, apiId);

  if (state.signedIn) return;
  if (!state.clientId) return;
  if (!hasMasterKey(app)) return;

  const did = keys.getNbGovDid(app);
  const sig = keys.signNbGov(app, state.clientId, { withType: true });

  await authApi.signIn({ did, sig });

  state.signedIn = true;
  app.auth.events.emit(signedInEvent(apiId));
};

const apiSignOut = async (app, apiId) => {
  const state = getState(app, apiId);
  const authApi = getAuthApi(app, apiId);

  if (!state.signedIn) return;

  await authApi.signOut();

  state.signedIn = false;
  app.auth.events.emit(signedOutEvent(apiId));
};

const connectListen = (app, apiId) =>
  api.onConnected(app, apiId, async (app, apiId, clientId) => {
    const state = getState(app, apiId);

    state.clientId = clientId;

    try {
      await apiSignIn(app, apiId);
    } catch {
      // TODO: handle, try to reconnect maybe
    }
  });

const disconnectListen = (app, apiId) =>
  api.onDisconnected(app, apiId, (app, apiId) => {
    const state = getState(app, apiId);

    state.signedIn = false;
    state.clientId = null;
  });

const getAuthApi = (app, apiId) =>
  api.get(app, apiId).auth || th(`auth: no auth api for '${apiId}'`);

const getState = (app, apiId) =>
  app.auth.states.get(apiId) || th(`auth: no state for api '${apiId}'`);

const signedInEvent = (apiId) => `${apiId}:signedIn`;

const signedOutEvent = (apiId) => `${apiId}:signedOut`;
