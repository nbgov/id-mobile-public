import { select } from "picofly/react";
import Paths from "ui/paths";
import Item from "../item";
import { settings as t } from "i18n";

export default select((app) => ({
  enabled: !!app.creds.size,
  title: t.creds.export,
  icon: "file-export",
  action: "modal",
  path: Paths.CredExport,
}))(Item);
