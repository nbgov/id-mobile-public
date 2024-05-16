import { createNanoEvents } from "nanoevents";

export default class Router {
  paths = [];
  modalPaths = [];
  modalOptions;

  events = createNanoEvents();
}
