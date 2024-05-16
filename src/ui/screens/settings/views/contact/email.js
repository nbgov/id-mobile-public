import { callback } from "lib/selectors";
import { select } from "picofly/react";
import { contactUs } from "../../actions";
import Item from "../item";
import { settings as t } from "i18n";

export default select(
  () => ({
    title: t.contact.email,
    icon: "at",
  }),
  callback("onPress", contactUs),
)(Item);
