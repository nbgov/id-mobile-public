import { nullable } from "banditypes";

export const signIn = {
  rpc: "auth.create",
  parse: nullable(),
};
