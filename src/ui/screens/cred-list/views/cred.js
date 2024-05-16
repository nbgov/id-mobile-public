import { select } from "picofly/react";
import { item } from "lib/selectors";
import { idRouteCallback } from "store/router/selectors";
import Paths from "ui/paths";
import Touchable from "ui/views/touchable";
import * as content from "./types";
import s, { colors } from "ui/styles";

// TODO: cred templates
export default select(
  item("cred"),
  // idRouteCallback('onPress', Paths.Cred),
)(Cred);

function Cred({ id, cred = {}, onPress }) {
  const { type } = cred;
  const Content = content[type] ?? (() => null); // TODO: default

  return (
    <Touchable onPress={onPress} rippleColor={colors.back} style={s`mh16 mv6`}>
      <Content id={id} />
    </Touchable>
  );
}
