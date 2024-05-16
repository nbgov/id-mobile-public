import { emit } from "react-native-react-bridge/lib/web/preact";
import MsgType from "../../../../../store/crypto/msg-type";
import { createPresentation } from "./create-presentation";

const Rpcs = {
  [MsgType.CreatePresentation]: createPresentation,
};

export const rpc = async (msg) => {
  let { data, type } = msg;
  const fn = Rpcs[type];
  if (!fn) return;

  const { id, args } = data;

  try {
    const res = await fn(args);
    data = { id, res };
  } catch (e) {
    const err = e.toString();
    data = { id, err };
  }

  emit({ type, data });
};
