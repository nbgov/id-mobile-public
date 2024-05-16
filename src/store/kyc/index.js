import { Alert } from "react-native";
import Veriff from "@veriff/react-native-sdk";
import { tpl } from "lib/tpl";
import * as auth from "store/auth";
import * as analytics from "store/analytics";
import * as confirm from "store/confirm";
import { hasPassport } from "store/cred/selectors";
import * as issuer from "store/issuer";
import { VeriffBranding } from "ui/styles";
import { common as ct } from "i18n";
import { KycStatus } from "const";

const KycType = "veriff";
const DefaultCfg = {
  branding: VeriffBranding,
  locale: "ru",
};

export const init = (app) => {
  auth.onSignedIn(app, "issuer", async () => {
    try {
      await getState(app);
    } catch {
      // TODO: handle, reconnect maybe
    }
  });

  watchState(app);
};

export const start = async (app) => {
  if (hasPassport(app)) return;

  const { kyc } = app;
  if (kyc.active || kyc.submitted) {
    return;
  }

  analytics.kycStart(app);
  kyc.active = true;

  try {
    const cfg = await createSession(app);
    const { status, error } = await Veriff.launchVeriff({
      ...DefaultCfg,
      ...cfg,
    });

    analytics.kycSubmitClosed(app, status, error);
  } finally {
    kyc.active = false;
  }

  await handleState(app);
};

const getState = async (app) => {
  const state = await app.api.issuer.kyc.state.get();
  await updateState(app, state);
};

const watchState = (app) =>
  app.api.issuer.kyc.state.onUpdated((state) => {
    void updateState(app, state);
  });

const createSession = async (app) => {
  const { type, state, cfg } = await app.api.issuer.kyc.create();
  if (type !== KycType) {
    throw new Error(`kyc type '${type}' not supported, please update the app`);
  }

  await updateState(app, state);

  return cfg;
};

const updateState = async (app, state) => {
  app.kyc.state = state;
  analytics.kycStateChanged(app);

  await handleState(app);
};

const handleState = async (app) => {
  if (hasPassport(app)) return;

  const { state, active } = app.kyc;
  if (active) return;

  try {
    switch (state.status) {
      case KycStatus.expired: {
        const ok = await confirm.ask(app, {
          title: ct.kycExpiredTitle,
          text: ct.kycExpiredText,
        });
        analytics.kycExpiredAsked(app, ok);

        return ok && (await start(app));
      }

      case KycStatus.resubmit: {
        const ok = await confirm.ask(app, {
          title: ct.kycResubmitTitle,
          text: tpl(ct.kycResubmitText, { reason: state.reason ?? "" }),
        });
        analytics.kycResubmitAsked(app, ok);

        return ok && (await start(app));
      }

      case KycStatus.declined: {
        const ok = await confirm.ask(app, {
          title: ct.kycDeclinedTitle,
          text: tpl(ct.kycDeclinedText, { reason: state.reason ?? "" }),
        });
        analytics.kycDeclinedAsked(app, ok);

        return ok && (await start(app));
      }

      case KycStatus.approved: {
        return await issuer.tryToIssue(app);
      }
    }
  } catch (e) {
    Alert.alert(ct.error, ct.errorText);
  }
};
