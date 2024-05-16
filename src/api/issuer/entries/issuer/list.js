import { array } from "banditypes";
import { credMeta } from "api/types";

export const list = {
  rpc: "issuer.list",
  parse: array(credMeta),
};
