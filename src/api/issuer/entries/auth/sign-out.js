import { nullable } from "banditypes";

export const signOut = {
  rpc: "auth.remove",
  parse: nullable(),
};
