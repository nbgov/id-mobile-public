import * as e from "./events";

export const logger = (log) => ({
  rpc: {
    start: (entry, args) => log?.({ event: e.RpcStart, entry, args }),
    req: (entry, args) => log?.({ event: e.RpcReq, entry, args }),
    res: (entry, args, res) => log?.({ event: e.RpcRes, entry, args, res }),
    end: (entry, args, res) => log?.({ event: e.RpcEnd, entry, args, res }),
  },
  event: {
    sub: (entry) => log?.({ event: e.EventSub, entry }),
    got: (entry, res) => log?.({ event: e.EventGot, entry, res }),
    emit: (entry, res) => log?.({ event: e.EventEmit, entry, res }),
  },
  error: (error) => log?.({ event: e.Error, error }),
});
