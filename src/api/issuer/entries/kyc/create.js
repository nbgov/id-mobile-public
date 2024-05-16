import { kycSession } from "api/types";

export const create = {
  rpc: "kyc.create",
  parse: kycSession,
};
