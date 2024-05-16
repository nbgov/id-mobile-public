export class HttpError extends Error {
  constructor(status, method, url, body) {
    super(`[${status}:${method}] ${url}`);
    Object.assign(this, { method, url, body, status });
  }
}
