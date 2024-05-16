import { array, object, objectLoose } from "banditypes";
import { date, nonEmptyStr, uint8Array } from "api/types";

const issueType = object({
  type: nonEmptyStr,
  schema: objectLoose(),
  keyType: nonEmptyStr,
  publicKey: uint8Array,
  sigType: nonEmptyStr,
});

const info = object({
  time: date,
  did: nonEmptyStr,
  issueTypes: array(issueType),
});

export const get = {
  rpc: "info.get",
  parse: info,
};
