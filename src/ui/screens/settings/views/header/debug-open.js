import { spec } from "lib/selectors";
import { TouchableWithoutFeedback, View } from "react-native";
import { select } from "picofly/react";
import { debugScreenEnabled } from "store/config/selectors";
import { routeCallback } from "store/router/selectors";
import Paths from "ui/paths";
import s from "ui/styles";

export default select(
  spec({ debugScreenEnabled }),
  routeCallback("onOpen", Paths.Debug),
)(DebugOpen);

function DebugOpen({ debugScreenEnabled, onOpen }) {
  if (!debugScreenEnabled) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onLongPress={onOpen} delayLongPress={5000}>
      <View style={s`abs r0 t0 w48 h48`} />
    </TouchableWithoutFeedback>
  );
}
