import { IconButton } from "ui/views/buttons";
import { select } from "picofly/react";
import { callback } from "lib/selectors";
import * as router from "store/router";

export default select(
  () => ({
    icon: "arrow-left",
  }),
  callback("onPress", router.pop),
)(IconButton);
