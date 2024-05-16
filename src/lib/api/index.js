import { logger } from "./logger";
import * as types from "./types";
import * as e from "./errors";

export { types };
export * as logEvents from "./logger/events";

export const create = (cfg, entries) => {
  const log = logger(cfg.log);
  const api = new Api({ ...cfg, log });

  const proxify = (tree) =>
    new Proxy(tree, {
      get(obj, prop, receiver) {
        const entry = Reflect.get(obj, prop, receiver);
        if (!entry) {
          return entry;
        }

        if (isSlice(entry)) {
          return proxify(entry);
        }

        if (!isObj(entry)) {
          return entry;
        }

        const { type = types.Rpc } = entry;
        api[type] || e.throwWrongType(type);

        return async (...args) => {
          try {
            return await api[type](entry, ...args);
          } catch (e) {
            log.error(e);
            throw e;
          }
        };
      },
    });

  return proxify(entries);
};

class Api {
  #client;
  #prepare;
  #parse;
  #log;

  constructor(cfg = {}) {
    this.#client = cfg.client || e.throwNoClient();
    this.#prepare = cfg.prepare;
    this.#parse = cfg.parse;
    this.#log = cfg.log;
  }

  async rpc(entry, ...args) {
    this.#log.rpc.start(entry, args);

    if (this.#prepare) {
      [args, entry] = await this.#prepare(args, entry);
    }
    this.#log.rpc.req(entry, args);

    let res = await this.#client.rpc(entry, ...args);
    this.#log.rpc.res(entry, args, res);

    if (this.#parse) {
      res = await this.#parse(res, entry, args);
    }
    this.#log.rpc.end(entry, args, res);

    return res;
  }

  async event(entry, fn) {
    this.#log.event.sub(entry);

    return this.#client.on(entry, async (res) => {
      this.#log.event.got(entry, res);

      if (this.#parse) {
        res = await this.#parse(res, entry);
      }
      this.#log.event.emit(entry, res);

      fn?.(res);
    });
  }

  async emit() {
    throw new Error("TODO");
  }
}

const isSlice = (val) => isObj(val) && Object.values(val).every(isObj);

const isObj = (val) => typeof val === "object";
