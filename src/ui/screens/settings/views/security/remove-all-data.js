import { callback } from "lib/selectors";
import { select } from "picofly/react";
import { clearData } from "../../actions";
import Item from "../item";
import { settings as t } from "i18n";

export default select(
  () => ({
    title: t.security.removeAllData,
    icon: "trash",
  }),
  callback("onPress", clearData),
)(Item);
