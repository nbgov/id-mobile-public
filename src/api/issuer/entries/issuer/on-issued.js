import { objectLoose } from "banditypes";
import { types } from "lib/api";

export const onIssued = {
  type: types.Event,
  event: "issuer.issued",
  parse: objectLoose(),
};
