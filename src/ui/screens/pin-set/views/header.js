import { select } from "picofly/react";
import Icon from "react-native-vector-icons/FontAwesome6";
import Cancel from "./cancel";
import { Mode } from "../state";
import Text from "ui/views/text";
import s from "ui/styles";
import { pinSet as t } from "i18n";

export default select((app) => ({
  mode: app.ui.pinSet.mode,
  notMatch: app.ui.pinSet.notMatch,
}))(Header);

function Header({ mode, notMatch }) {
  const title =
    mode === Mode.Set ? t.title : notMatch ? t.notMatchTitle : t.repeatTitle;
  const desc =
    mode === Mode.Set
      ? t.subtitle
      : notMatch
        ? t.notMatchSubtitle
        : t.repeatSubtitle;
  const icon =
    mode === Mode.Set
      ? "unlock-keyhole"
      : notMatch
        ? "triangle-exclamation"
        : "unlock";

  return (
    <>
      <Cancel style={s`abs t16 r16`} />
      <Icon
        name={icon}
        style={s("fs48 h48 w48", notMatch ? "primary" : "text")}
      />
      <Text style={s("mt24 fs24 fw500", notMatch && "primary")}>{title}</Text>
      <Text style={s("mt4 fs16", notMatch && "primary")}>{desc}</Text>
    </>
  );
}
