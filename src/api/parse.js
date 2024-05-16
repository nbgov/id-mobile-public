export const parse = (res, entry, args) =>
  entry.parse ? entry.parse(res, entry, args) : res;
