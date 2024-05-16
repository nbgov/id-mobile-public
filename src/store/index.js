import { create, objMapIgnoreSpecialsRef } from "picofly";
import AppState from "./state";

export const createStore = () =>
  create(new AppState(), objMapIgnoreSpecialsRef);
