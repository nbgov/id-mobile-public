import * as map from "lib/map";
import { CredType } from "const";

export const credIds = (app) => map.keys(app.creds);

export const credList = (app) => map.values(app.creds);

export const hasPassport = (app) =>
  map.values(app.creds).some((cred) => cred.type === CredType.passport);
