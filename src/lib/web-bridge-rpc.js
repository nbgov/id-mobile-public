import { createRef } from "react";

export const LogType = "__LOG__";

export default class WebBridgeRpc {
  emitRef = createRef();

  #id = 0;
  #calls = new Map();

  async rpc(type, args) {
    const emit = this.emitRef.current;
    if (!emit) {
      throw new Error("emitRef is not initialized");
    }

    const id = this.#id++;

    // TODO: add timeout
    return new Promise((resolve, reject) => {
      this.#calls.set(id, { resolve, reject });

      const msg = { type, data: { id, args } };
      emit(msg);
    });
  }

  processMsg = (msg) => {
    const { type, data } = msg;
    const { id, res, err } = data;

    if (type === LogType) {
      return console.log(...data);
    }

    const { resolve, reject } = this.#calls.get(id) || {};
    if (!resolve) return;

    this.#calls.delete(id);

    if (err) {
      return reject(new Error(err));
    }

    resolve(res);
  };
}
