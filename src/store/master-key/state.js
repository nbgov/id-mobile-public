import { createNanoEvents } from "nanoevents";

export default class MasterKey {
  key = null;
  events = createNanoEvents();
}
