import { AppState, Platform, Linking } from "react-native";
import messaging from "@react-native-firebase/messaging";
import notifee, { AuthorizationStatus } from "@notifee/react-native";
import * as lock from "store/lock";
import * as storage from "store/storage";
import * as auth from "store/auth";

export const register = () => notifee.onBackgroundEvent(async () => {});

export const init = async (app) => {
  await Promise.all([checkPermission(app), notifeeInit(app)]);

  AppState.addEventListener("change", (state) => {
    if (state !== "active") return;
    checkPermission(app);
  });

  messaging().onMessage((msg) => processForegroundMsg(app, msg));
  messaging().onTokenRefresh((token) => tokenUpdate(app, token));

  auth.onSignedIn(app, "cm", async () => {
    try {
      await tokenSaveToApi(app);
    } catch {
      // TODO: handle, reconnect maybe
    }
  });

  try {
    const token = await messaging().getToken();
    await tokenUpdate(app, token);
  } catch {}

  lock.onUnlocked(app, tokenUpdate);
};

export const requestPermission = async (app) => {
  if (app.cm.allowed) return;

  const settings = await notifee.requestPermission();

  app.cm.allowed = isAllowed(settings);
  if (app.cm.allowed) return;

  switch (Platform.OS) {
    case "android":
      return notifee.openNotificationSettings();
    case "ios":
      return Linking.openSettings();
  }
};

export const clearData = (app) => storage.remove(app, CmNs, TokenKey);

const CmNs = "cm";
const TokenKey = "token";

const tokenUpdate = async (app, token = app.cm.token) => {
  app.cm.token = token;

  if (app.lock.locked) {
    return;
  }

  try {
    await tokenSaveToApi(app);
    tokenSave(app, token);
  } catch {}
};

const tokenSaveToApi = async (app) => {
  const { token } = app.cm;
  if (!token) return;

  let oldToken = tokenLoad(app);
  if (token === oldToken) {
    oldToken = undefined;
  }

  const platform = Platform.OS;
  const cfg = { platform, token, oldToken };
  await app.api.cm.token.save(cfg);
};

const tokenSave = (app, token) => storage.set(app, CmNs, TokenKey, token);

const tokenLoad = (app) => storage.getStr(app, CmNs, TokenKey);

const processForegroundMsg = async (app, msg) => {
  const { channelId } = app.cm;

  const { data, notification } = msg;
  const { title, body } = notification;

  try {
    await notifee.displayNotification({
      title,
      body,
      data,
      android: { channelId },
    });
  } catch {}
};

const notifeeInit = async (app) => {
  if (Platform.OS !== "android") return;

  app.cm.channelId = await notifee.createChannel({
    id: "general",
    name: "General",
  });
};

const checkPermission = async (app) => {
  try {
    const settings = await notifee.getNotificationSettings();
    app.cm.allowed = isAllowed(settings);
  } catch {}
};

const isAllowed = (settings) =>
  settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
  settings.authorizationStatus === AuthorizationStatus.PROVISIONAL;
