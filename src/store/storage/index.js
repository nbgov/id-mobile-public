import { MMKV } from "react-native-mmkv";
import { ref } from "picofly";

export const init = (app) => (app.mmkv = ref(app, new MMKV()));

export const set = (app, namespace, key, value) => {
  key = fullKey(namespace, key);

  if (isObj(value)) {
    value = JSON.stringify(value);
  }

  return app.mmkv.set(key, value);
};

export const getObj = (app, namespace, key) => {
  key = fullKey(namespace, key);

  const value = app.mmkv.getString(key);
  if (value === undefined) return;

  return JSON.parse(value);
};

export const getStr = (app, namespace, key) => {
  key = fullKey(namespace, key);
  return app.mmkv.getString(key);
};

export const getNum = (app, namespace, key) => {
  key = fullKey(namespace, key);
  return app.mmkv.getNumber(key);
};

export const getBool = (app, namespace, key) => {
  key = fullKey(namespace, key);
  return app.mmkv.getBoolean(key);
};

export const getBuffer = (app, namespace, key) => {
  key = fullKey(namespace, key);
  return app.mmkv.getBuffer(key);
};

export const has = (app, namespace, key) => {
  key = fullKey(namespace, key);
  return app.mmkv.contains(key);
};

export const remove = (app, namespace, key) => {
  key = fullKey(namespace, key);
  app.mmkv.delete(key);
};

export const getKeys = (app, namespace) => {
  namespace += NamespaceDelimiter;

  return app.mmkv
    .getAllKeys()
    .filter((key) => key.startsWith(namespace))
    .map((key) => key.slice(namespace.length));
};

export const clear = (app, namespace) => {
  const keys = getKeys(app, namespace);

  for (const key of keys) {
    remove(app, namespace, key);
  }
};

export const clearAll = (app) => app.mmkv.clearAll();

const NamespaceDelimiter = ":";

const fullKey = (namespace, key) => namespace + NamespaceDelimiter + key;

const isObj = (val) => val && typeof val === "object";
