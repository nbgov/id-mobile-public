import * as vpRequest from "@nbgov/vp-request";
import * as simpleZKQuery from "@nbgov/vp-request-simple-zk-query";
import * as router from "store/router";
import { credList } from "store/cred/selectors";
import * as crypto from "store/crypto";
import * as analytics from "store/analytics";
import { VPCreateStatus } from "const";
import Paths from "ui/paths";

export const create = async (app, params) => {
  const { nonce, cfg, uri } = params;

  if (cfg.credAsks.length) {
    const allowed = await ask(app, cfg, uri);
    if (!allowed) {
      throwWithStatus(VPCreateStatus.denied, "denied");
    }
  }

  return crypto.createPresentation(app, nonce, cfg);
};

export const createFromRequest = async (app, req, uri) => {
  const { queries, nonce } = parseRequest(app, req, uri);

  return Promise.all(queries.map(queryExecutor(app, nonce, uri)));
};

export const allow = (app) => {
  analytics.presentationAllowed(app);
  resolve(app, true);
};

export const deny = (app) => {
  analytics.presentationDenied(app);
  resolve(app, false);
};

const parseRequest = (app, req, uri) => {
  try {
    req = vpRequest.validate(req);
  } catch {
    throwWithStatus(VPCreateStatus.badRequest, "invalid request");
  }

  const { domain, challenge: nonce, query: queries } = req;
  uri = new URL(uri);

  if (domain !== uri.hostname) {
    throwWithStatus(VPCreateStatus.badRequest, "invalid domain");
  }

  return { queries, nonce };
};

const queryExecutor = (app, nonce, uri) => async (query) => {
  const { indexes, credAsks } = getCreateConfig(app, query);

  const cfg = { credAsks };
  const params = { nonce, uri, cfg };
  const presentation = await create(app, params);

  return { indexes, presentation };
};

const getCreateConfig = (app, query) => {
  const creds = credList(app);
  const queryResults = simpleZKQuery.exec(creds, query);

  if (!queryResults) {
    throwWithStatus(VPCreateStatus.notFound, "not found");
  }

  return queryResults.reduce(
    (res, queryResult) => {
      const { items, credentialQuery } = queryResult;
      const { reason, attributes, bounds, inequals } = credentialQuery;

      // TODO: ask user to choose cred if several
      const id = items[0]?.id;
      if (!id) {
        res.indexes.push(null);
        return res;
      }

      res.indexes.push(res.credAsks.length);
      res.credAsks.push({ id, reason, ask: { attributes, bounds, inequals } });

      return res;
    },
    {
      indexes: [],
      credAsks: [],
    },
  );
};

const ask = (app, cfg, uri) =>
  new Promise((resolve) => {
    analytics.presentationAsked(app);
    app.presentation.asked.push({ cfg, uri, resolve });
    router.modal(app, Paths.PresentationAsk);
  });

const resolve = (app, allowed) => {
  app.presentation.asked.shift()?.resolve(allowed);
  router.modalClose(app);

  if (app.presentation.asked.length) {
    router.modal(app, Paths.PresentationAsk);
  }
};

const throwWithStatus = (status, msg) => {
  const err = new Error(msg);
  err.vpCreateStatus = status;
  throw err;
};
