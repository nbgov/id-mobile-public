import * as e from "../../logger/events";
import * as methods from "./methods";

export const consoleLog = (msg, prefix = "") => {
  const { event, entry, args, res } = msg;
  const req = args[0];
  const method = req?.method ?? entry.method ?? methods.Get;
  const path = req?.path ?? entry.path;

  switch (event) {
    case e.RpcStart:
      return console.log(`<- ${prefix}${method} ${path} ${json(req)}`);
    case e.RpcEnd:
      return console.log(
        `-> ${prefix}${method} ${path} ${json(req)}: ${json(res)}`,
      );
  }
};

const empty = "(empty)";
const json = (val) => (val !== undefined ? JSON.stringify(val) : empty);
