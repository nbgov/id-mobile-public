import * as clipboard from "lib/clipboard";
import { Alert } from "react-native";
import { tpl } from "lib/tpl";
import * as link from "lib/link";
import * as keys from "store/keys";
import * as pin from "store/pin";
import * as creds from "store/cred";
import * as masterKey from "store/master-key";
import * as confirm from "store/confirm";
import * as router from "store/router";
import * as migrations from "store/migrations";
import Paths from "ui/paths";
import { settings as t, common as ct } from "i18n";

export const copyNbGovDid = (app) => {
  const nbGovDid = keys.getNbGovDid(app);
  clipboard.copyString(nbGovDid);
};

export const pinSetChange = async (app) => {
  if (!app.pin.set) {
    return router.modal(app, Paths.PinSet);
  }

  const ask = { reason: t.security.pinAskReason, canCancel: true };
  const [res, closeAsk] = await pin.ask(app, ask);
  closeAsk();

  if (res !== pin.Result.Ok) {
    return;
  }

  router.modal(app, Paths.PinSet);
};

export const contactUs = async (app) => {
  const { contactEmail } = app.remoteCfg;

  try {
    await link.mailto(contactEmail);
  } catch {
    Alert.alert(
      t.contact.noEmailClientTitle,
      tpl(t.contact.noEmailClientText, { contactEmail }),
    );
  }
};

export const clearData = async (app) => {
  const ok = await confirm.ask(app, {
    title: t.security.removeAllDataConfirmTitle,
    text: t.security.removeAllDataConfirmText,
    yesTitle: ct.remove,
  });
  if (!ok) return;

  try {
    await Promise.all([
      migrations.clearData(app),
      creds.clear(app),
      masterKey.remove(app),
    ]);
    Alert.alert(
      t.security.removeAllDataOkTitle,
      t.security.removeAllDataOkText,
    );
  } catch {
    Alert.alert(ct.error, t.security.removeAllDataFailed);
  }
};
