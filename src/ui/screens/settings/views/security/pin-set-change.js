import { callback } from "lib/selectors";
import { select } from "picofly/react";
import { pinSetChange } from "ui/screens/settings/actions";
import Item from "../item";
import { settings as t } from "i18n";

export default select(
  (app) => ({
    title: app.pin.set ? t.security.pinChange : t.security.pinSet,
    icon: "grip-vertical",
  }),
  callback("onPress", pinSetChange),
)(Item);
