import { kycState } from "api/types";

export const get = {
  rpc: "kyc.state.get",
  parse: kycState,
};
