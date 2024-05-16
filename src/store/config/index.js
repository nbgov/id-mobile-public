import { DefaultAppCfg } from "const";

export const init = async (app) => {
  try {
    app.remoteCfg = await app.api.issuer.appConfig.get();
  } catch {
    app.remoteCfg = DefaultAppCfg;
  }
};
