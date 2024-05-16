import { create } from "lib/api";
import { parse } from "api/parse";
import * as wsRpcClient from "lib/api/clients/ws-rpc";
import * as entries from "./entries";

export const createIssuerApi = (cfg) => {
  const log = cfg.log ? (msg) => wsRpcClient.consoleLog(msg, "iss:") : null;
  const client = wsRpcClient.create(cfg);
  const api = create({ client, parse, log }, entries);

  void client.connect();

  return api;
};
