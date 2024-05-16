import * as e from "../../logger/events";

export const consoleLog = (msg, prefix = "") => {
  let { event, entry, args, res, error } = msg;

  args = args?.map((arg) => JSON.stringify(arg));

  switch (event) {
    case e.RpcStart:
      return console.log(`<- ${prefix}${entry.rpc}(${args.join(", ")})`);
    case e.RpcEnd:
      return console.log(
        `-> ${prefix}${entry.rpc}(${args.join(", ")}): ${json(res)}`,
      );
    case e.EventSub:
      return console.log(`* ${prefix}${entry.event}`);
    case e.EventEmit:
      return console.log(`*-> ${prefix}${entry.event}: ${json(res)}`);
    case e.Error:
      return console.log(`*e* ${prefix}${error ?? empty}`);
  }
};

const empty = "(empty)";
const json = (val) => (val !== undefined ? JSON.stringify(val) : empty);
