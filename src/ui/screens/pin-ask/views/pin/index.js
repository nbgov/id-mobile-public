import { select } from "picofly/react";
import { callback } from "lib/selectors";
import { addDigit, removeDigit } from "../../actions";
import Pin from "ui/views/pin";
// import Finger from './finger'
import { Pin as PinCfg } from "const";

export default select(
  (app) => ({
    blocked: app.ui.pinAsk.checking || app.pin.blocked,
    count: PinCfg.length,
    activeCount: app.ui.pinAsk.activeCount,
    error: app.ui.pinAsk.wrongPin,
    // Special: Finger,
  }),
  callback("onAddDigit", addDigit),
  callback("onRemoveDigit", removeDigit),
)(Pin);
