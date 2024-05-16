import crashlytics from "@react-native-firebase/crashlytics";
import { screenCfg } from "store/router/selectors";
import * as keys from "store/keys";
import * as masterKey from "store/master-key";
import * as router from "store/router";
import * as storage from "store/storage";

export const init = async (app) => {
  if (!storage.has(app, StorageNs, EnabledKey)) {
    storage.set(app, StorageNs, EnabledKey, true);
  }

  app.crashlyticsEnabled = storage.getBool(app, StorageNs, EnabledKey);

  if (app.crashlyticsEnabled) {
    await crashlytics().setCrashlyticsCollectionEnabled(true);
  }

  masterKey.onSet(app, async () => {
    const nbGovDid = keys.getNbGovDid(app);
    await setUser(app, nbGovDid);
  });

  masterKey.onUnset(app, async () => {
    await setUser(app, null);
  });

  router.on(app, "changed", screenSet);
};

export const report = (e) => crashlytics().recordError(e);

export const enable = async (app) => {
  if (app.crashlyticsEnabled) return;

  app.crashlyticsEnabled = true;
  try {
    await crashlytics().setCrashlyticsCollectionEnabled(true);
    storage.set(app, StorageNs, EnabledKey, true);
  } catch {
    app.crashlyticsEnabled = false;
  }
};

export const disable = async (app) => {
  if (!app.crashlyticsEnabled) return;

  app.crashlyticsEnabled = false;
  try {
    await crashlytics().setCrashlyticsCollectionEnabled(false);
    storage.set(app, StorageNs, EnabledKey, false);
  } catch {
    app.crashlyticsEnabled = true;
  }
};

export const toggle = async (app) =>
  app.crashlyticsEnabled ? disable(app) : enable(app);

export const clearData = (app) => storage.remove(app, StorageNs, EnabledKey);

const StorageNs = "crashReports";
const EnabledKey = "enabled";

const setUser = async (app, did) => {
  try {
    await crashlytics().setUserId(did);
  } catch {}
};

const screenSet = (app) => async (location) => {
  const cfg = screenCfg(app, location);
  if (!cfg) return;

  const { name, params } = cfg;

  try {
    await crashlytics().setAttributes({
      screen: name,
      ...params,
    });
  } catch {}
};
