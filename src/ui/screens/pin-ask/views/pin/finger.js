import { select } from "picofly/react";
import { callback } from "lib/selectors";
import IconButton from "ui/views/buttons/icon-button";
import s from "ui/styles";

export default select(
  callback("onPress", () => alert("TODO")),
  (app, props) => ({
    enabled: !props.blocked,
    icon: "fingerprint",
    opacityFeedback: true,
    style: s`w96 h96`,
    iconStyle: s(props.blocked && "textDisabled"),
  }),
)(IconButton);
