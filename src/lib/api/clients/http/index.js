import { compile } from "path-to-regexp";
import * as methods from "./methods";
import * as errors from "./errors";
import * as resultTypes from "./result-types";

export { methods, errors, resultTypes };
export { consoleLog } from "./console-log";

export const create = (cfg) => {
  const baseUrl = cfg.baseUrl || "http-client: baseUrl required"();

  return {
    rpc: rpc(baseUrl),
    on: () => "http-client: on() is not allowed!"(),
    emit: () => "http-client: emit() is not allowed!"(),
  };
};

const rpc =
  (baseUrl) =>
  async (entry, req = {}) => {
    let { method, path, body, resultType, params, headers, query } = req;

    method ??= entry.method ?? methods.Get;
    path ??= entry.path ?? "http-client: path is empty"();
    resultType ??= entry.resultType ?? "json";
    params = { ...entry.params, ...params };
    headers = { ...entry.headers, ...headers };
    query = { ...entry.query, ...query };
    body ??= entry.body;

    body = prepareBody(headers, body);

    const absolute = path.startsWith("http");
    const url = new URL(absolute ? path : baseUrl + path);

    url.pathname = compile(url.pathname)(params);

    for (const name in query) {
      url.searchParams.set(name, query[name]);
    }

    const opt = { method, headers, body };
    const resp = await fetch(url, opt);

    if (!resp.ok) {
      throw new errors.HttpError(resp.status, method, url, resp.body);
    }

    return parseResult(resp, resultType);
  };

const prepareBody = (headers, body) => {
  const isJson = Object.entries(headers).every(
    ([header, value]) =>
      header.toLowerCase() !== "content-type" ||
      value.toLowerCase() === "application/json",
  );
  if (!isJson) {
    return body;
  }

  headers["content-type"] = "application/json";
  body = JSON.stringify(body);

  return body;
};

const parseResult = (resp, resultType) => {
  switch (resultType) {
    case "json":
      return resp.json();
    case "text":
      return resp.text();
    case "blob":
      return resp.blob();
    case "buffer":
      return resp.arrayBuffer();
    case "form":
      return resp.formData();
    case "body":
      return resp.body;
    case "raw":
    default:
      return resp;
  }
};
