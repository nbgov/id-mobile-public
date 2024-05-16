import { select } from "picofly/react";
import { howItWorksUrl } from "../selectors";
import WebLink from "ui/views/web-link";
import { credIssue as t } from "i18n";

export default select((app) => ({
  uri: howItWorksUrl(app),
  title: t.howWorksWebTitle,
}))(WebLink);
