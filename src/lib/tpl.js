export const tpl = (str, params) =>
  str.replace(/{{(.+?)}}/g, (match, key) => params[key] ?? match);
