import * as vpRequest from "@nbgov/vp-request";
import * as simpleZkQuery from "@nbgov/vp-request-simple-zk-query";
import * as analytics from "store/analytics";
import * as presentation from "store/presentation";
import * as confirm from "store/confirm";
import * as router from "store/router";
import Paths from "ui/paths";
import MsgType from "./inject-api/msg-type";
import { CredType, VPCreateStatus } from "const";
import { voting as t } from "i18n";

export const setUri = (app, props, uri) => {
  const ui = app.ui.webServiceState;
  ui.uri = uri;
};

export const loadingStarted = (app, props) => {
  const ui = app.ui.webServiceState;
  const { id } = props;

  ui.loadingStartedAt = Date.now();
  ui.loadedAnalyticsSent = false;

  analytics.votingLoadStart(app, id);
};

export const loadingEnded = (app, props, e) => {
  const ui = app.ui.webServiceState;

  // WebView onLoadEnd called twice for some reason
  if (ui.loadedAnalyticsSent) return;
  ui.loadedAnalyticsSent = true;

  const { code, description, title } = e.nativeEvent;
  const { id } = props;

  const tookMs = Date.now() - ui.loadingStartedAt;
  const failed = code || title.startsWith(":error");

  if (failed) {
    analytics.votingLoadFailed(app, id, tookMs, { code, description });
  } else {
    analytics.votingLoaded(app, id, tookMs);
  }
};

export const bridgeMsg = async (app, props, msg) => {
  const { emit } = app.ui.webServiceState;

  let { type, data } = msg;
  const { id, args = {} } = data;

  const rpc = Rpcs[type];
  if (!rpc) {
    data = { id, err: "not implemented" };
    return emit({ type, data });
  }

  try {
    const res = await rpc(app, args);
    data = { id, res };
  } catch {
    data = { id, err: "failed" };
  }

  emit({ type, data });
};

const presentationCreate = async (app, req) => {
  const { uri } = app.ui.webServiceState;

  try {
    const result = await presentation.createFromRequest(app, req, uri);
    return { status: VPCreateStatus.ok, result };
  } catch (e) {
    if (isNotFound(e) && isPassportRequest(req)) {
      const ok = await confirm.ask(app, {
        title: t.askIssueTitle,
        text: t.askIssueText,
        yesTitle: t.askIssueYes,
      });
      if (ok) {
        router.reset(app, Paths.CredList);
        setTimeout(() => router.push(app, Paths.CredIssue), 1);
        return;
      }
    }

    return {
      status: e.vpCreateStatus ?? VPCreateStatus.error,
      error: e.vpCreateStatus ? e.message : "failed to create presentation",
    };
  }
};

const Rpcs = {
  [MsgType.PresentationCreate]: presentationCreate,
};

const isNotFound = (e) => e.vpCreateStatus === VPCreateStatus.notFound;

const isPassportRequest = (req) =>
  vpRequest
    .validate(req)
    .query.some((query) =>
      simpleZkQuery
        .validate(query)
        .credentialQuery.some(
          (credQuery) => credQuery.filter?.type === CredType.passport,
        ),
    );
