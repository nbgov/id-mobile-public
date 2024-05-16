export const identity = (v) => v;
export const partial =
  (fn, ...args1) =>
  (...args2) =>
    fn(...args1, ...args2);
