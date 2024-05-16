import { callback } from "lib/selectors";
import { select } from "picofly/react";
import * as analytics from "store/analytics";
import SwitchItem from "../switch-item";
import { settings as t } from "i18n";

export default select(
  (app) => ({
    value: app.analyticsEnabled,
    title: t.analytics.analytics,
    icon: "chart-simple",
  }),
  callback("onPress", analytics.toggle),
)(SwitchItem);
