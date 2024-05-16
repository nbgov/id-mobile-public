import { ref } from "picofly";
import { createClient } from "@segment/analytics-react-native";
import * as map from "lib/map";
import { screenCfg } from "store/router/selectors";
import { hasPassport } from "store/cred/selectors";
import { hasMasterKey } from "store/master-key/selectors";
import * as storage from "store/storage";
import * as api from "store/api";
import * as auth from "store/auth";
import * as lock from "store/lock";
import * as masterKey from "store/master-key";
import * as router from "store/router";
import * as keys from "store/keys";
import { AnalyticEvent, WsApiIds, AuthApiIds } from "const";

export const init = (app, cfg) => {
  if (!storage.has(app, StorageNs, EnabledKey)) {
    storage.set(app, StorageNs, EnabledKey, true);
  }

  app.analyticsEnabled = storage.getBool(app, StorageNs, EnabledKey);

  const storePersistor = getStorePersistor(app);
  const segment = createClient({
    ...cfg.analytics.segment,
    writeKey: app.remoteCfg.segmentKey,
    storePersistor,
  });
  app.segment = ref(app, segment);

  for (const apiId of WsApiIds) {
    api.onConnected(app, apiId, apiConnected);
    api.onDisconnected(app, apiId, apiDisconnected);
  }

  for (const apiId of AuthApiIds) {
    auth.onSignedIn(app, apiId, authSignedIn);
    auth.onSignedOut(app, apiId, authSignedOut);
  }

  lock.onLocked(app, locked);
  lock.onUnlocked(app, unlocked);

  masterKey.onSet(app, setUser);
  masterKey.onUnset(app, unsetUser);

  router.on(app, "changed", screenOpened);
  router.on(app, "modalOpened", modalOpened);
  router.on(app, "modalClosed", modalClosed);
};

export const enable = (app) => {
  app.analyticsEnabled = true;
  storage.set(app, StorageNs, EnabledKey, true);
};

export const disable = (app) => {
  app.analyticsEnabled = false;
  storage.set(app, StorageNs, EnabledKey, false);
};

export const toggle = (app) =>
  app.analyticsEnabled ? disable(app) : enable(app);

export const clearData = (app) => storage.remove(app, StorageNs, EnabledKey);

// confirm
export const confirmAsked = (app, ask) =>
  void log(app, AnalyticEvent.confirm.asked, ask);

export const confirmYes = (app, ask) =>
  void log(app, AnalyticEvent.confirm.yes, ask);

export const confirmNo = (app, ask) =>
  void log(app, AnalyticEvent.confirm.no, ask);

// pin
export const pinSetStart = (app) => void log(app, AnalyticEvent.pin.setStart);

export const pinSetClose = (app) =>
  void log(
    app,
    app.ping.set ? AnalyticEvent.pin.set : AnalyticEvent.pin.setCanceled,
  );

export const pinRemoved = (app) => void log(app, AnalyticEvent.pin.removed);

export const pinWrong = (app, blocked, attempts) =>
  void log(app, AnalyticEvent.pin.wrong, { blocked, attempts });

export const pinAsked = (app, ask) =>
  void log(app, AnalyticEvent.pin.asked, { ask });

export const pinAskResolve = (app, ask, result) =>
  void log(app, AnalyticEvent.pin.asked, { ask, result });

// key
export const keyCreateStart = (app) => {
  void log(app, AnalyticEvent.key.createStart);

  const ms = Date.now();

  return () => {
    void log(app, AnalyticEvent.key.created, {
      took_ms: Date.now() - ms,
    });
  };
};

// kyc
export const kycStart = (app) => void log(app, AnalyticEvent.kyc.start);

export const kycStateChanged = (app) =>
  void log(app, AnalyticEvent.kyc.stateChanged);

export const kycSubmitClosed = (app, status, error) =>
  void log(app, AnalyticEvent.kyc.submitClosed, {
    kyc_submit_status: status,
    kyc_submit_error: error,
  });

export const kycExpiredAsked = (app, ok) =>
  void log(app, AnalyticEvent.kyc.expiredAsked, { ok });

export const kycResubmitAsked = (app, ok) =>
  void log(app, AnalyticEvent.kyc.resubmitAsked, { ok });

export const kycDeclinedAsked = (app, ok) =>
  void log(app, AnalyticEvent.kyc.declinedAsked, { ok });

// cred
export const credIssueStart = (app) =>
  void log(app, AnalyticEvent.cred.issueStart);

export const credIssueResult = (app, result) =>
  void log(app, AnalyticEvent.cred.issueResult, { result });

export const credIssued = (app, { id, issuer, type }) =>
  void log(app, AnalyticEvent.cred.issued, { id, issuer, type });

// issuer
export const issueStepOpened = (app, step) =>
  void log(app, AnalyticEvent.issue.stepOpened, { step });

export const issueStepClosed = (app, step) =>
  void log(app, AnalyticEvent.issue.stepClosed, { step });

export const issueStepComplete = (app, step) =>
  void log(app, AnalyticEvent.issue.stepComplete, { step });

// presentation
export const presentationAsked = (app) =>
  void log(app, AnalyticEvent.presentation.asked);

export const presentationAllowed = (app) =>
  void log(app, AnalyticEvent.presentation.allowed);

export const presentationDenied = (app) =>
  void log(app, AnalyticEvent.presentation.declined);

// voting
export const votingListLoadStart = (app) => {
  void log(app, AnalyticEvent.voting.listLoadStart);

  const ms = Date.now();

  return (count) => {
    void log(app, AnalyticEvent.voting.listLoaded, {
      count,
      took_ms: Date.now() - ms,
    });
  };
};

export const votingLoadStart = (app, id) =>
  void log(app, AnalyticEvent.voting.loadStart, { id });

export const votingLoaded = (app, id, tookMs) =>
  void log(app, AnalyticEvent.voting.loaded, {
    id,
    took_ms: tookMs,
  });

export const votingLoadFailed = (app, id, tookMs, { code, description }) =>
  void log(AnalyticEvent.voting.loadFailed, {
    id,
    code,
    description,
    took_ms: tookMs,
  });

// api
const apiConnected = (app, apiId) =>
  void log(app, AnalyticEvent.api.connected, { apiId });

const apiDisconnected = (app, apiId) =>
  void log(app, AnalyticEvent.api.disconnected, { apiId });

// auth
const authSignedIn = (app, apiId) =>
  void log(app, AnalyticEvent.auth.signedIn, { apiId });

const authSignedOut = (app, apiId) =>
  void log(app, AnalyticEvent.auth.signedOut, { apiId });

// lock
const locked = (app) => void log(app, AnalyticEvent.lock.locked);

const unlocked = (app) => void log(app, AnalyticEvent.lock.unlocked);

const StorageNs = "analytics";
const EnabledKey = "enabled";

const setUser = async (app) => {
  try {
    const nbGovDid = keys.getNbGovDid(app);
    await app.segment.identify(nbGovDid);
  } catch {}
};

const unsetUser = async (app) => {
  try {
    await app.segment.identify(null);
  } catch {}
};

const getStorePersistor = (app) => ({
  set: async (key, value) =>
    storage.set(app, StorageNs, key, JSON.stringify(value)),

  get: async (key) => storage.getObj(app, StorageNs, key),
});

const log = async (app, event, params) => {
  if (!app.analyticsEnabled) return;

  params = getParams(app, params);

  try {
    await app.segment?.track(event, params);
  } catch {}
};

const modalOpened = async (app, location) =>
  log(app, AnalyticEvent.modal.opened, { location });

const modalClosed = async (app, location, canceled) =>
  log(app, AnalyticEvent.modal.closed, { location, canceled });

const screenOpened = async (app, location) => {
  if (!app.analyticsEnabled) return;

  const cfg = screenCfg(app, location);
  if (!cfg) return;

  let { name, params } = cfg;
  params = getParams(app, params);

  try {
    await app.segment?.screen(name, params);
  } catch {}
};

const getParams = (app, params) => ({
  from_belarus: app.countryCode === "BY",
  signed_in: map
    .entries(app.auth.states)
    .reduce(
      (res, [apiId, state]) => Object.assign(res, { [apiId]: state.signedIn }),
      {},
    ),
  locked: app.lock.locked,
  pin_blocked: app.pin.blocked,
  pin_set: app.pin.set,
  kyc_status: app.kyc.state?.status,
  kyc_reason: app.kyc.state?.reason,
  key_has: hasMasterKey(app),
  cred_count: app.creds.size,
  passport_has: hasPassport(app),
  ...params,
});
