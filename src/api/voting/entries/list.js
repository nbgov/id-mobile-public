import { object, array, optional, string } from "banditypes";
import { jsonDate, mongoIdMap, nonEmptyStr } from "api/types";

const Voting = object({
  _id: nonEmptyStr,
  code: string()
    .or(optional())
    .map((code) => code || undefined),
  title: nonEmptyStr,
  header: string().or(optional()),
  status: nonEmptyStr, // TODO: status enum
  startDate: jsonDate,
  endDate: jsonDate,
}).map(mongoIdMap);

const Response = object({
  list: array(Voting),
}).map((res) => res.list);

export const list = {
  path: "/polls",
  parse: Response,
};
