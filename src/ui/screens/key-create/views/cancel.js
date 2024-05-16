import { callback } from "lib/selectors";
import { select } from "picofly/react";
import * as router from "store/router";
import Button from "ui/views/buttons/button";
import { common as ct } from "i18n";
import s from "ui/styles";

export default select(
  () => ({
    title: ct.cancel,
    raised: false,
    style: s`mh24`,
  }),
  callback("onPress", router.modalClose),
)(Button);
