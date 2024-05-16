import { select } from "picofly/react";
import { callback } from "lib/selectors";
import { reset } from "../../actions";
import Button from "ui/views/buttons/button";
import s from "ui/styles";
import { common as ct } from "i18n";

export default select(callback("onPress", reset), () => ({
  title: ct.back,
  raised: false,
  titleStyle: s`fs16`,
  viewStyle: s`ph0`,
  style: s`h64`,
}))(Button);
