import { edwardsToMontgomeryPriv } from "@noble/curves/ed25519";
import { decodePair } from "@polkadot/keyring/pair/decode";
import { ENCODING_NONE } from "@polkadot/util-crypto/json/constants";
import * as masterKey from "store/master-key";
import { NbGovKeyId } from "const";

export const get = (app, id) => masterKey.derive(app, id);

export const getSecret = (app, id) => {
  const key = get(app, id);
  const pkcs8 = key.encodePkcs8();
  const pair = decodePair(null, pkcs8, ENCODING_NONE);

  return pair.secretKey;
};

export const getMontgomerySecret = (app, id) => {
  const secret = getSecret(app, id);

  return edwardsToMontgomeryPriv(secret);
};

export const getDid = (app, id) => {
  const key = get(app, id);
  return key.address;
};

export const sign = (app, id, msg, options) =>
  masterKey.signDerived(app, id, msg, options);

// helpers
export const getNbGov = (app) => get(app, NbGovKeyId);

export const getNbGovDid = (app) => getDid(app, NbGovKeyId);

export const signNbGov = (app, msg, options) =>
  sign(app, NbGovKeyId, msg, options);
