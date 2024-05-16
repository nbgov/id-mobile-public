import { createIpInfoApi } from "api/ip-info";
import { ref } from "picofly";
import { Alert } from "react-native";
import Paths from "ui/paths";
import * as router from "store/router";
import * as deniedCountry from "./denied-country";
import * as auth from "./auth";
import * as storage from "./storage";
import * as migrations from "./migrations";
import * as pin from "./pin";
import * as api from "./api";
import * as crypto from "./crypto";
import * as masterKey from "./master-key";
import * as config from "./config";
import * as creds from "./cred";
import * as issuer from "./issuer";
import * as kyc from "./kyc";
import * as analytics from "./analytics";
import * as crashlytics from "./crashlytics";
import * as lock from "./lock";
import * as cm from "./cm";
import { common as ct } from "i18n";

export const init = async (app, cfg) => {
  try {
    const isAllowedCountry = await preInit(app, cfg);
    app.ready = true;

    if (isAllowedCountry) {
      await run(app);
    }
  } catch (e) {
    crashlytics.report(e);
    Alert.alert(ct.error, ct.errorText);
  }
};

export const run = async (app) => {
  try {
    await initApp(app, app.cfg);
  } catch (e) {
    crashlytics.report(e);
    Alert.alert(ct.error, ct.errorText);
  }
};

const preInit = async (app, cfg) => {
  app.cfg = cfg;
  app.api ??= ref(app, {});
  app.api.ipInfo = createIpInfoApi(cfg.api.ipInfo);

  storage.init(app);
  await migrations.init(app);

  return deniedCountry.init(app, cfg);
};

const initApp = async (app, cfg) => {
  router.init(app);
  await crashlytics.init(app);
  api.init(app, cfg);
  auth.init(app);
  await config.init(app);
  api.initVotingApi(app, cfg);
  analytics.init(app, cfg);
  crypto.init(app);
  masterKey.init(app);
  kyc.init(app);
  await issuer.init(app);
  await pin.init(app);
  lock.init(app);
  void cm.init(app);

  if (app.lock.locked) {
    void lock.unlockAsk(app);
  } else {
    router.push(app, Paths.CredList);
  }

  app.inited = true;
};
