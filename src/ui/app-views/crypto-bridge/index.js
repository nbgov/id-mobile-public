import { select } from "picofly/react";
import WebBridge from "ui/views/web-bridge";
import html from "./html";
import { Debug } from "const";

export default select((app) => ({
  emitRef: app.cryptoBridge.emitRef,
  onMsg: app.cryptoBridge.processMsg,
  html,
  webviewDebuggingEnabled: Debug.cryptoWebView,
  visible: Debug.cryptoWebView,
  style: Debug.cryptoWebView && { height: 1 },
}))(WebBridge);
