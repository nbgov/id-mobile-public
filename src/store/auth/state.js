import { createNanoEvents } from "nanoevents";

export default class Auth {
  states = new Map();
  events = createNanoEvents();
}
