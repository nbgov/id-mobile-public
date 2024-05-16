import { callback } from "lib/selectors";
import { select } from "picofly/react";
import * as router from "store/router";
import Touchable from "ui/views/touchable";

const NonPathActions = ["pop", "popRoot", "modalClose", "modalCancel"];

export default select(
  callback(
    "onPress",
    (app, props) => {
      const { onPress, action = "push", path, params, modalOptions } = props;

      if (onPress) {
        return onPress();
      }

      if (path || NonPathActions.includes(action)) {
        router[action]?.(app, path, params, modalOptions);
      }
    },
    (app, props) => [props.onPress, props.path, props.action],
  ),
)(Touchable);
