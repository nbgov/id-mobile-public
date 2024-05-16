export const dotPathValue = (val, dotPath) => {
  const path = dotPath.split(".");
  let obj;

  do {
    const prop = path.shift();
    obj = val;
    val = obj[prop];
  } while (val && path.length);

  return val;
};
