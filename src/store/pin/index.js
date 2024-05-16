import * as router from "store/router";
import * as keychain from "lib/keychain";
import * as analytics from "store/analytics";
import { Pin } from "const";
import Paths from "ui/paths";

const KeychainNs = "pin";
const KeychainPin = "pin";
const KeychainAttempts = "attempts";
const KeychainBlockTimeLeft = "blockTimeLeft";

export const Result = {
  Ok: "ok",
  Wrong: "wrong",
  Blocked: "blocked",
  Canceled: "canceled",
};

export const init = async (app) => {
  const [pinSet, attempts = 0, blockTimeLeft = 0] = await Promise.all([
    isSet(),
    keychain.get(KeychainNs, KeychainAttempts),
    keychain.get(KeychainNs, KeychainBlockTimeLeft),
  ]);
  app.pin.set = pinSet;
  app.pin.attempts = attempts;
  app.pin.blockTimeLeft = blockTimeLeft;

  if (blockTimeLeft) {
    runBlockTimer(app);
  }
};

export const set = async (app, pin) => {
  await keychain.set(KeychainNs, KeychainPin, pin);
  app.pin.set = true;
};

export const remove = async (app) => {
  await keychain.remove(KeychainNs, KeychainPin);

  app.pin.set = false;

  analytics.pinRemoved(app);

  return true;
};

export const check = async (app, pin) => {
  const ok = await isOk(pin);
  if (!ok) {
    const blocked = await handleWrong(app);
    analytics.pinWrong(app, blocked, app.pin.attempts);

    return blocked ? Result.Blocked : Result.Wrong;
  }

  await Promise.all([setAttempts(app, 0), setBlockTimeLeft(app, 0)]);

  return Result.Ok;
};

export const ask = async (app, ask, modalOptions) =>
  new Promise((resolve) => {
    analytics.pinAsked(app, ask);
    app.pin.ask = { ...ask, resolve };

    if (!ask.skipModal) {
      router.modal(app, Paths.PinAsk, null, modalOptions);
    }
  });

export const askResolve = (app, result) => {
  const ask = app.pin.ask;
  if (!ask) return;

  analytics.pinAskResolve(app, ask, result);

  const close = () => {
    if (!ask.skipModal) {
      router.modalClose(app);
    }

    app.pin.ask = undefined;
  };

  ask.resolve([result, close]);
};

export const clearData = async () =>
  await Promise.all([
    keychain.remove(KeychainNs, KeychainPin),
    keychain.remove(KeychainNs, KeychainAttempts),
    keychain.remove(KeychainNs, KeychainAttempts),
  ]);

const isSet = async () => {
  const keys = await keychain.keys(KeychainNs);
  return keys.includes(KeychainPin);
};

const isOk = async (pin) => {
  const appPin = await keychain.get(KeychainNs, KeychainPin);
  return appPin === pin;
};

const handleWrong = async (app) => {
  let attempts = app.pin.attempts + 1;
  const blocked = attempts >= Pin.attempts;

  if (blocked) {
    attempts = 0;
    await setBlockTimeLeft(app, Pin.blockTimeMs);
    runBlockTimer(app);
  }

  await setAttempts(app, attempts);

  return blocked;
};

const setAttempts = async (app, attempts) => {
  app.pin.attempts = attempts;
  await keychain.set(KeychainNs, KeychainAttempts, attempts);
};

const setBlockTimeLeft = async (app, left) => {
  app.pin.blockTimeLeft = left;
  await keychain.set(KeychainNs, KeychainBlockTimeLeft, left);
};

const runBlockTimer = (app) => {
  const timer = setInterval(() => {
    let blockTimeLeft = app.pin.blockTimeLeft - 1000;

    if (blockTimeLeft <= 0) {
      blockTimeLeft = 0;
      clearInterval(timer);
    }

    void setBlockTimeLeft(app, blockTimeLeft);
  }, 1000);
};
