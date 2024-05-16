import { callback } from "lib/selectors";
import { select } from "picofly/react";
import { copy } from "../actions";
import Button from "ui/views/buttons/button";
import { withIcon } from "ui/views/buttons/with-icon";
import { common as ct } from "i18n";

export default select(
  (app) => ({
    enabled: !!app.ui.keyCreate.key,
    title: ct.copy,
    raised: false,
    icon: "copy",
  }),
  callback("onPress", copy),
)(withIcon(Button));
