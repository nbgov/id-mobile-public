import { appCfg } from "api/types";

export const get = {
  rpc: "appConfig.get",
  parse: appCfg,
};
