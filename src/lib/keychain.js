import {
  setGenericPassword,
  getGenericPassword,
  getAllGenericPasswordServices,
  resetGenericPassword,
  STORAGE_TYPE,
} from "react-native-keychain";

const NamespaceDelimiter = ":";
const storage = STORAGE_TYPE.AES;

export const set = async (namespace, key, value) => {
  const service = serviceName(namespace, key);
  value = JSON.stringify(value);

  await setGenericPassword(key, value, { service, storage });
};

export const get = async (namespace, key) => {
  const service = serviceName(namespace, key);

  const res = await getGenericPassword({ service, storage });
  if (!res) return;

  const { username, password } = res;
  if (username !== key) {
    throw new Error(
      `keychain key '${key}' does not match username '${username}'`,
    );
  }

  return JSON.parse(password);
};

export const all = async (namespace) => {
  const allKeys = await keys(namespace, { storage });

  return Promise.all(allKeys.map((key) => get(namespace, key)));
};

export const keys = async (namespace) => {
  namespace += NamespaceDelimiter;

  const services = await getAllGenericPasswordServices();

  return services
    .filter((key) => key.startsWith(namespace))
    .map((key) => key.slice(namespace.length));
};

export const remove = async (namespace, key) => {
  const service = serviceName(namespace, key);

  return resetGenericPassword({ service, storage });
};

export const clear = async (namespace) => {
  const allKeys = await keys(namespace);

  const res = await Promise.all(
    allKeys.map(async (key) => {
      const ok = await remove(namespace, key);
      return [key, ok];
    }),
  );

  return Object.fromEntries(res);
};

const serviceName = (namespace, key) => namespace + NamespaceDelimiter + key;
