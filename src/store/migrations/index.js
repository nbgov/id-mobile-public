import * as analytics from "store/analytics";
import * as cm from "store/cm";
import * as crashlytics from "store/crashlytics";
import * as creds from "store/cred";
import * as deniedCountry from "store/denied-country";
import * as masterKey from "store/master-key";
import * as pin from "store/pin";
import * as storage from "store/storage";

const DataVersion = 1;

export const init = async (app) => {
  loadVersion(app);

  if (!app.dataVersion) {
    await clearData(app);
  }

  // migration

  saveVersion(app);
};

export const clearData = async (app) => {
  analytics.clearData(app);
  crashlytics.clearData(app);
  deniedCountry.clearData(app);
  cm.clearData(app);

  await Promise.all([
    creds.clearData(),
    masterKey.clearData(),
    pin.clearData(),
  ]);
};

const Storage = {
  ns: "migrations",
  version: "version",
};

const saveVersion = (app) =>
  storage.set(app, Storage.ns, Storage.version, DataVersion);

const loadVersion = (app) =>
  (app.dataVersion = storage.getNum(app, Storage.ns, Storage.version));
