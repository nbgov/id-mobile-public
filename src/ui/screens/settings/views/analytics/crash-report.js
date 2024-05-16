import { callback } from "lib/selectors";
import { select } from "picofly/react";
import * as crashlytics from "store/crashlytics";
import SwitchItem from "../switch-item";
import { settings as t } from "i18n";

export default select(
  (app) => ({
    value: app.crashlyticsEnabled,
    title: t.analytics.crashReport,
    icon: "bug",
  }),
  callback("onPress", crashlytics.toggle),
)(SwitchItem);
