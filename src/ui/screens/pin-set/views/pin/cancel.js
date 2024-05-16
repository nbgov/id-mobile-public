import { select } from "picofly/react";
import { callback } from "lib/selectors";
import * as router from "store/router";
import Button from "ui/views/buttons/button";
import s from "ui/styles";
import { common as ct } from "i18n";

export default select(
  () => ({
    title: ct.cancel,
    raised: false,
    titleStyle: s`fs16`,
    viewStyle: s`ph0`,
    style: s`h64`,
  }),
  callback("onPress", router.pop),
)(Button);
