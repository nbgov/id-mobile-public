import { View } from "react-native";
import { select } from "picofly/react";
import { item } from "lib/selectors";
import { idRouteCallback } from "store/router/selectors";
import Paths from "ui/paths";
import Text from "ui/views/text";
import Touchable from "ui/views/touchable";
import Status from "./status";
import Time from "./time";
import s, { colors } from "ui/styles";

export default select(
  item("voting"),
  idRouteCallback("onPress", Paths.Voting),
)(Voting);

function Voting({ id, voting = {}, onPress }) {
  const { code, title, header } = voting;

  return (
    <Touchable
      onPress={onPress}
      rippleColor={colors.back}
      style={s`card shadow mh16 mv6 pv8`}
    >
      <View style={s`row`}>
        <Text style={s`f1 mr8 fs16 primary fw500`}>
          {code ? code + " " : ""}
          {title}
        </Text>
        <Status id={id} />
      </View>
      <Time id={id} style={s`mt4`} />
      {header && <Text style={s`mt8`}>{header}</Text>}
    </Touchable>
  );
}
