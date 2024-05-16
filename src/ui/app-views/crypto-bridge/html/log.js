import { emit } from "react-native-react-bridge/lib/web/preact";

const Log = true;

export const log = Log
  ? (...data) => emit({ type: "__LOG__", data })
  : () => {};
