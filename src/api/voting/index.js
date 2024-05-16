import { create } from "lib/api";
import { parse } from "api/parse";
import * as httpClient from "lib/api/clients/http";
import * as entries from "./entries";

export const createVotingApi = (cfg) => {
  const log = cfg.log ? httpClient.consoleLog : null;
  const client = httpClient.create(cfg);

  return create({ client, parse, log }, entries);
};
