import { th } from "lib/th";
import * as types from "./types";

export const throwNoClient = () => th("client required");

export const throwWrongType = (type) => {
  const validTypes = `'${Object.values(types).join("', '")}'`;
  th(`api entry is invalid: type is '${type}', should be one of ${validTypes}`);
};
