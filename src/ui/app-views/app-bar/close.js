import { IconButton } from "ui/views/buttons";
import { select } from "picofly/react";
import { callback } from "lib/selectors";
import * as router from "store/router";

export default select(
  () => ({
    icon: "xmark",
  }),
  callback("onPress", router.pop),
)(IconButton);
