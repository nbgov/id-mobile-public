import { createNanoEvents } from "nanoevents";
import { Client } from "@ws-rpc/client";
import { MsgpackEncoder } from "@ws-rpc/encoder-msgpack";

export { consoleLog } from "./console-log";

export const create = (cfg) => {
  const emitter = createNanoEvents();
  const onevent = emitter.emit.bind(emitter);
  const encoders = [MsgpackEncoder];
  const wsc = new Client({ encoders, onevent, ...cfg });

  return {
    connect: () => wsc.connect(),
    disconnect: () => wsc.close(),
    rpc: (entry, ...args) => wsc.rpc(entry.rpc, ...args),
    on: (entry, cb) => emitter.on(entry.event, cb),
  };
};
