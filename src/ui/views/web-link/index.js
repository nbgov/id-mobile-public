import { callback } from "lib/selectors";
import { select } from "picofly/react";
import * as router from "store/router";
import Paths from "ui/paths";
import Text from "ui/views/text";
import s from "ui/styles";

export default select(
  callback("onPress", (app, props) => {
    const { title, uri } = props;
    if (!uri) return;

    router.push(app, Paths.Web, {
      title: title && encodeURIComponent(title),
      uri: encodeURIComponent(uri),
    });
  }),
  (app, props) => ({
    style: s("b primary u", props.style),
  }),
)(Text);
