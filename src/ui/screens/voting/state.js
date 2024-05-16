import { createRef } from "react";

export default class UIWebServiceState {
  static Name = "webServiceState";

  emitRef = createRef();
  uri = null;
  loadingStartedAt = null;
  loadedAnalyticsSent = false;

  get emit() {
    const emit = this.emitRef.current;
    if (!emit) {
      throw new Error("emitRef is not initialised");
    }

    return emit;
  }
}
