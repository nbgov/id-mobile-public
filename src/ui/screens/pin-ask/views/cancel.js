import { callback } from "lib/selectors";
import { select } from "picofly/react";
import IconButton from "ui/views/buttons/icon-button";
import { cancel } from "../actions";

export default select(
  () => ({ icon: "xmark" }),
  callback("onPress", cancel),
)(IconButton);
