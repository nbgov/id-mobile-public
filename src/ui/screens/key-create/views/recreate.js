import { callback } from "lib/selectors";
import { select } from "picofly/react";
import { create } from "../actions";
import Button from "ui/views/buttons/button";
import { withIcon } from "ui/views/buttons/with-icon";
import { common as ct } from "i18n";

export default select(
  (app) => ({
    enabled:
      !app.ui.keyCreate.creating &&
      !app.ui.keyCreate.agreeSaved &&
      !app.ui.keyCreate.agreeNoDisclose,
    title: ct.other,
    raised: false,
    icon: "rotate",
  }),
  callback("onPress", create),
)(withIcon(Button));
