import { events } from "@ws-rpc/client";
import { nonEmptyStr } from "api/types";
import { types } from "lib/api";

export const onConnected = {
  type: types.Event,
  event: events.Connected,
  parse: nonEmptyStr,
};
