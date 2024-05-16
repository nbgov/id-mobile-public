import { partial } from "lib/fns";
import { ref } from "picofly";
import { Keyring } from "@polkadot/keyring";
import { mnemonicGenerate } from "@polkadot/util-crypto";
import * as keychain from "lib/keychain";
import * as analytics from "store/analytics";
import { th } from "lib/th";

export const init = (app) => (app.keyring = ref(app, new Keyring()));

export const create = async (app) => {
  const analyticsCreated = analytics.keyCreateStart(app);

  const mnemonic = mnemonicGenerate();
  const key = app.keyring.createFromUri(mnemonic, { name: "master" });

  analyticsCreated();

  return { mnemonic, key };
};

export const set = async (app, key) => {
  await save(key);
  setKey(app, key);
};

export const unset = (app) => {
  app.masterKey.key = null;
  app.masterKey.events.emit("unset");
};

export const derive = (app, keyId) => {
  const key = getKey(app);

  return key.derive(`//${keyId}`, { name: keyId });
};

export const sign = (app, msg, options) => {
  const key = getKey(app);

  return key.sign(msg, options);
};

export const signDerived = (app, keyId, msg, options) => {
  const key = derive(app, keyId);

  return key.sign(msg, options);
};

export const loadSaved = async (app) => {
  const json = await keychain.get(Keychain.ns, Keychain.master);
  if (!json) return;

  const key = app.keyring.createFromJson(json);
  key.unlock();

  setKey(app, key);
};

export const remove = async (app) => {
  await clearData();
  unset(app);
};

export const clearData = async () =>
  keychain.remove(Keychain.ns, Keychain.master);

export const onSet = (app, fn) =>
  app.masterKey.events.on("set", partial(fn, app));

export const onUnset = (app, fn) =>
  app.masterKey.events.on("unset", partial(fn, app));

const Keychain = {
  ns: "key",
  master: "master",
};

const setKey = (app, key) => {
  app.masterKey.key = key;
  app.masterKey.events.emit("set", key);
};

const save = async (key) => {
  const data = key.toJson();

  await keychain.set(Keychain.ns, Keychain.master, data);
};

const getKey = (app) => app.masterKey.key || th("no master key");
