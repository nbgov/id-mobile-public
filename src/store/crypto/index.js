import { ref } from "picofly";
import WebBridgeRpc from "lib/web-bridge-rpc";

export * from "./rpc";

export const init = (app) => {
  const bridge = new WebBridgeRpc();
  app.cryptoBridge = ref(app, bridge);
};
