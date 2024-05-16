import { create } from "lib/api";
import { parse } from "api/parse";
import * as httpClient from "lib/api/clients/http";
import * as entries from "./entries";

export const createIpInfoApi = (cfg) => {
  const prepare = preparer(cfg.token);

  const log = cfg.log ? (msg) => httpClient.consoleLog(msg, "ipInfo:") : null;
  const client = httpClient.create(cfg);

  return create({ client, prepare, parse, log }, entries);
};

const preparer = (token) => (args, entry) => {
  entry = {
    ...entry,
    query: { ...entry.query, token },
  };

  return [args, entry];
};
