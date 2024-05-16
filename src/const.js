export { version } from "../app.json";

export const DeniedCountryCodes = ["BY", "RU"];
export const VPNInstructionUrl = "xxx";

export const Cfg = {
  analytics: {
    segment: {
      trackAppLifecycleEvents: true,
      debug: false,
    },
  },
  api: {
    issuer: {
      url: "xxx",
      log: false,
    },
    cm: {
      url: "xxx",
      log: false,
    },
    voting: {
      log: false,
    },
    ipInfo: {
      baseUrl: "xxx",
      token: "xxx",
      log: false,
    },
  },
};

export const DefaultAppCfg = {
  votingBaseUrl: "xxx",
  votingApiBaseUrl: "xxx",
  howItWorksUrl: "xxx",
  contactEmail: "",
  segmentKey: "",
  debugScreenEnabled: false,
};

export const VotingStrategy = "newbelarus";

export const NbGovKeyId = "nbgov";
export const CredExportKeyId = "cred_export";

export const WsApiIds = ["issuer", "cm"];
export const AuthApiIds = WsApiIds;

export const Pin = {
  length: 6,
  attempts: 5,
  blockTimeMs: 60_000,
};

export const CredType = {
  passport: "NewBelarusPassport",
  telegram: "NewBelarusTelegram",
};
export const ProofType = {
  kyc: "kyc",
  jct: "json_crypto_token",
};

export const Debug = {
  cryptoWebView: false,
  votingWebView: false,
};

export const VPCreateStatus = {
  ok: "ok",
  denied: "denied",
  notFound: "not_found",
  badRequest: "bad_request",
  error: "error",
};

export const KycStatus = {
  notExist: "not_exist",
  created: "created",
  approved: "approved",
  declined: "declined",
  expired: "expired",
  submitted: "submitted",
  resubmit: "resubmit",
};
export const IssueResult = {
  noClients: "no_clients",
  noKyc: "no_kyc",
  alreadyIssuedForDid: "already_issued_for_did",
  alreadyIssuedForPersonId: "already_issued_for_personId",
  invalidPersonData: "invalid_person_data",
  issued: "issued",
};

export const AnalyticEvent = {
  modal: {
    opened: "modal_opened",
    closed: "modal_closed",
  },
  confirm: {
    asked: "confirm_asked",
    yes: "confirm_yes",
    no: "confirm_no",
  },
  api: {
    connected: "api_connected",
    disconnected: "api_disconnected",
  },
  auth: {
    signedIn: "auth_signed_in",
    signedOut: "auth_signed_out",
  },
  lock: {
    locked: "lock_locked",
    unlocked: "lock_unlocked",
    unlockFailed: "lock_unlock_failed",
  },
  pin: {
    setStart: "pin_set_start",
    set: "pin_set",
    setCanceled: "pin_set_canceled",
    removed: "pin_removed",
    wrong: "pin_wrong",
    asked: "pin_asked",
    askResolve: "pin_ask_resolve",
  },
  key: {
    createStart: "key_create_start",
    created: "key_created",
  },
  kyc: {
    start: "kyc_start",
    stateChanged: "kyc_state_changed",
    submitClosed: "kyc_submit_closed",
    expiredAsked: "kyc_expired_asked",
    resubmitAsked: "kyc_resubmit_asked",
    declinedAsked: "kyc_declined_asked",
  },
  cred: {
    issueOpened: "cred_issue_opened",
    issueClosed: "cred_issue_closed",
    issueStart: "cred_issue_start",
    issueResult: "cred_issue_result",
    issued: "cred_issued",
  },
  issue: {
    stepOpened: "issue_step_opened",
    stepClosed: "issue_step_closed",
    stepComplete: "issue_step_complete",
  },
  presentation: {
    asked: "presentation_asked",
    allowed: "presentation_allowed",
    denied: "presentation_denied",
  },
  voting: {
    listLoadStart: "voting_list_load_start",
    listLoaded: "voting_list_loaded",
    loadStart: "voting_load_start",
    loaded: "voting_loaded",
    loadFailed: "voting_load_failed",
  },
};
