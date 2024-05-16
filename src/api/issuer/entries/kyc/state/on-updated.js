import { types } from "lib/api";
import { kycState } from "api/types";

export const onUpdated = {
  type: types.Event,
  event: "kyc.state.updated",
  parse: kycState,
};
