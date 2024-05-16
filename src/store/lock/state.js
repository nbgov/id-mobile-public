import { createNanoEvents } from "nanoevents";

export default class Lock {
  locked = true;
  events = createNanoEvents();
}
