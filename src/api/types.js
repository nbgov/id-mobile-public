import {
  string,
  fail,
  number,
  instance,
  optional,
  object,
  enums,
  unknown,
  boolean,
} from "banditypes";
import { isAddress } from "@polkadot/util-crypto";
import { KycStatus, DefaultAppCfg } from "const";

export const nonEmptyStr = string().map((s) => (s.length ? s : fail()));

export const date = instance(Date).map((date) => (isNaN(date) ? fail() : date));
export const jsonDate = nonEmptyStr
  .or(number())
  .map((val) => new Date(val))
  .map(date);

export const uint8Array = instance(Uint8Array);
export const empty = optional();

export const mongoIdMap = (obj) => {
  obj.id = obj._id || fail();
  delete obj._id;
  return obj;
};

export const did = string().map((did) => (isAddress(did) ? did : t.fail()));

export const credMeta = object({
  type: nonEmptyStr,
  issuerDid: did,
  did,
  issuedAt: date,
});

export const kycState = object({
  status: enums(Object.values(KycStatus)),
  reason: string().or(optional()),
});

export const kycSession = object({
  state: kycState,
  type: nonEmptyStr,
  cfg: unknown(),
});

export const appCfg = object({
  votingBaseUrl: nonEmptyStr.or(() => DefaultAppCfg.votingBaseUrl),
  votingApiBaseUrl: nonEmptyStr.or(() => DefaultAppCfg.votingApiBaseUrl),
  howItWorksUrl: nonEmptyStr.or(() => DefaultAppCfg.howItWorksUrl),
  contactEmail: nonEmptyStr.or(() => DefaultAppCfg.contactEmail),
  segmentKey: nonEmptyStr.or(() => DefaultAppCfg.segmentKey),
  debugScreenEnabled: boolean().or(() => DefaultAppCfg.debugScreenEnabled),
});
