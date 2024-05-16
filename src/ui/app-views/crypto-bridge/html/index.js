import {
  webViewRender,
  useNativeMessage,
} from "react-native-react-bridge/lib/web/preact";
import { Buffer } from "buffer";
import { rpc } from "./rpc";

window.Buffer = Buffer;

const Root = () => {
  useNativeMessage(rpc);
  return null;
};

export default webViewRender(<Root />);
