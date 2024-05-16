import * as keys from "store/keys";
import { hasMasterKey } from "store/master-key/selectors";

export const nbGovDid = (app) =>
  hasMasterKey(app) ? keys.getNbGovDid(app) : undefined;
