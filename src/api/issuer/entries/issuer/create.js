import { enums } from "banditypes";
import { IssueResult } from "const";

const result = enums(Object.values(IssueResult));

export const create = {
  rpc: "issuer.create",
  parse: result,
};
