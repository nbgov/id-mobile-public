import { select } from "picofly/react";
import { toggler } from "lib/selectors";
import Checkbox from "ui/views/checkbox";
import { withText } from "ui/views/checkbox/with-text";
import { deniedCountry as t } from "i18n";
import s from "ui/styles";

export default select(
  (app) => ({
    checked: app.ui.deniedCountry.confirmed,
    enabled: !app.ui.deniedCountry.checking,
    text: t.confirm,
    textStyle: s`fs16`,
  }),
  toggler("onPress", "ui.deniedCountry.confirmed"),
)(withText(Checkbox));
