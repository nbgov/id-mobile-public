import { select } from "picofly/react";
import { callback } from "lib/selectors";
import { addDigit, removeDigit } from "../../actions";
import { Mode } from "../../state";
import Pin from "ui/views/pin";
import Cancel from "./cancel";
import Back from "./back";
import { Pin as PinCfg } from "const";

export default select(
  (app) => ({
    mode: app.ui.pinSet.mode,
    count: PinCfg.length,
    activeCount: app.ui.pinSet.activeCount,
    error: app.ui.pinSet.notMatch,
    Special: app.ui.pinSet.mode === Mode.Set ? Cancel : Back,
  }),
  callback("onAddDigit", addDigit),
  callback("onRemoveDigit", removeDigit),
)(Pin);
