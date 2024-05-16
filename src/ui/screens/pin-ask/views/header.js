import { ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import * as format from "lib/format";
import { tpl } from "lib/tpl";
import { select } from "picofly/react";
import Text from "ui/views/text";
import Cancel from "./cancel";
import s, { colors } from "ui/styles";
import { pinAsk as t } from "i18n";

export default select((app) => ({
  ask: app.pin.ask,
  blockTimeLeft: app.pin.blockTimeLeft,
  wrongPin: app.ui.pinAsk.wrongPin,
  checking: app.ui.pinAsk.checking,
}))(Header);

function Header({ ask = {}, blockTimeLeft, wrongPin, checking }) {
  const { reason, canCancel } = ask;
  const blocked = !!blockTimeLeft;
  const left = blocked && format.minSec(blockTimeLeft);

  return (
    <>
      {canCancel && <Cancel style={s`abs t16 r16`} />}
      {checking ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={s`w48 h48`}
        />
      ) : (
        <Icon
          name={blocked ? "lock" : "key"}
          style={s("fs48 w48 h48", blocked || wrongPin ? "primary" : "text")}
        />
      )}
      <Text style={s("mt24 fs24 fw500", (blocked || wrongPin) && "primary")}>
        {(blocked && t.blockedPinTitle) ||
          (wrongPin && t.wrongPinTitle) ||
          t.title}
      </Text>
      <Text style={s("mt4 fs16 tc", (blocked || wrongPin) && "primary")}>
        {(blocked && tpl(t.blockedPinSubtitle, { left })) ||
          (wrongPin && t.wrongPinSubtitle) ||
          reason}
      </Text>
    </>
  );
}
