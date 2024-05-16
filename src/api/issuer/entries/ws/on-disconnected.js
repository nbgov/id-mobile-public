import { events } from "@ws-rpc/client";
import { empty } from "api/types";
import { types } from "lib/api";

export const onDisconnected = {
  type: types.Event,
  event: events.Disconnected,
  parse: empty,
};
