import { object } from "banditypes";
import { nonEmptyStr } from "api/types";

const IpInfo = object({
  country: nonEmptyStr,
});

export const get = {
  path: "/",
  parse: IpInfo,
};
