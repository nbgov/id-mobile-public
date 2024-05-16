import * as msgpack from "msgpackr";
import * as fflate from "fflate";
import { u8aConcatStrict } from "@polkadot/util";
import {
  base64Encode,
  base64Decode,
  naclEncrypt,
  naclDecrypt,
} from "@polkadot/util-crypto";
import * as keys from "store/keys";
import * as keychain from "lib/keychain";
import * as map from "lib/map";
import { th } from "lib/th";
import { CredExportKeyId } from "const";

export const loadSaved = async (app) => {
  const creds = await keychain.all(KeychainNs);
  map.merge(app.creds, creds);
};

export const unload = (app) => app.creds.clear();

export const add = async (app, cred) => {
  const id = cred.id || throwNoId();
  app.creds.has(id) && throwHasCred(id);

  app.creds.set(id, cred);
  await save(cred);
};

export const clearData = async () => keychain.clear(KeychainNs);

export const clear = async (app) => {
  await clearData();
  app.creds.clear();
};

export const importAll = (app, data) => {
  data = base64Decode(data);
  data = decrypt(app, data);
  data = fflate.gunzipSync(data);

  const creds = msgpack.unpack(data);
  map.merge(app.creds, creds);
};

export const exportAll = (app) => {
  const creds = map.values(app.creds);
  // creds.forEach(cred => delete cred.credentialSchema)

  let data = msgpack.pack(creds);
  data = fflate.gzipSync(data);
  data = encrypt(app, data);
  data = base64Encode(data);

  return data;
};

const KeychainNs = "cred";

const save = async (cred) => keychain.set(KeychainNs, cred.id, cred);

const encrypt = (app, data) => {
  const secret = getSecret(app);
  const { encrypted, nonce } = naclEncrypt(data, secret);

  return u8aConcatStrict([nonce, encrypted]);
};

const decrypt = (app, data) => {
  const secret = getSecret(app);

  const nonce = data.slice(0, 24);
  data = data.slice(24);

  return naclDecrypt(data, nonce, secret);
};

const getSecret = (app) => keys.getMontgomerySecret(app, CredExportKeyId);

const throwNoId = () => th("cred->add: no id");

const throwHasCred = (id) => th(`cred->add: cred '${id}' already exists`);
