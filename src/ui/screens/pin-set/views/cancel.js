import { callback } from "lib/selectors";
import { select } from "picofly/react";
import * as router from "store/router";
import IconButton from "ui/views/buttons/icon-button";

export default select(
  () => ({ icon: "xmark" }),
  callback("onPress", router.modalClose),
)(IconButton);
