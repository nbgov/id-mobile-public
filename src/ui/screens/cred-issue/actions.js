import * as kyc from "store/kyc";
import { hasMasterKey } from "store/master-key/selectors";

export const init = (app) =>
  (app.ui.credIssue.steps = [
    !app.pin.set && "Pin",
    !app.cm.allowed && "Cm",
    !hasMasterKey(app) && "Key",
    "Verify",
  ].filter(Boolean));

export const next = (app) => {
  const ui = app.ui.credIssue;
  ui.stepNo = Math.min(ui.stepNo + 1, ui.steps.length - 1);
};

export const issue = async (app) => {
  try {
    await kyc.start(app);
  } catch (e) {
    // TODO
    alert("Error issuing");
  }
};
