import { partial } from "lib/fns";
import { th } from "lib/th";
import { ref } from "picofly";
import { createIssuerApi } from "api/issuer";
import { createVotingApi } from "api/voting";
import { createCmApi } from "api/cm";

export const init = (app, cfg) => {
  app.api ??= ref(app, {});
  app.api.issuer = createIssuerApi(cfg.api.issuer);
  app.api.cm = createCmApi(cfg.api.cm);
};

export const initVotingApi = (app, cfg) => {
  const { votingApiBaseUrl } = app.remoteCfg;
  app.api.voting = createVotingApi({
    ...cfg.api.voting,
    baseUrl: votingApiBaseUrl,
  });
};

export const get = (app, apiId) =>
  app.api[apiId] || th(`api: api '${apiId}' not found`);

export const onConnected = (app, apiId, fn) =>
  onWsEvent(app, apiId, "onConnected", fn);

export const onDisconnected = (app, apiId, fn) =>
  onWsEvent(app, apiId, "onDisconnected", fn);

const onWsEvent = (app, apiId, event, fn) =>
  get(app, apiId).ws?.[event]?.(partial(fn, app, apiId)) ||
  th(`api: ws event '${event}' not found for api '${apiId}'`);
