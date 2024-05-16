import { toggler } from "lib/selectors";
import { select } from "picofly/react";
import Checkbox from "ui/views/checkbox";
import { withText } from "ui/views/checkbox/with-text";
import { keyCreating as t } from "i18n";
import s from "ui/styles";

export default select(
  (app) => ({
    enabled: !!app.ui.keyCreate.key,
    checked: app.ui.keyCreate.agreeNoDisclose,
    text: t.agreeNoDisclose,
    textStyle: s("f1", app.ui.keyCreate.key ? "primary" : "disabledPrimary"),
  }),
  toggler("onPress", "ui.keyCreate.agreeNoDisclose"),
)(withText(Checkbox));
