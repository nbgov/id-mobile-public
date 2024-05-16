import { memo } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import Touchable from "ui/views/touchable";
import Digit from "./digit";
import s from "ui/styles";

export default memo(PinPad);

function PinPad({ blocked, Special, onAddDigit, onRemoveDigit, style }) {
  const digits = Array.from(Array(9).keys()).map((i) => (
    <Digit key={i + 1} digit={i + 1} blocked={blocked} onPress={onAddDigit} />
  ));

  return (
    <View style={s("w288 aic jcc row wrap", style)}>
      {digits}

      <View style={s`h96 w96 aic jcc`}>
        {Special && <Special blocked={blocked} />}
      </View>

      <Digit digit={0} blocked={blocked} onPress={onAddDigit} />

      <Touchable
        onPress={onRemoveDigit}
        enabled={!blocked}
        opacityFeedback
        style={s`h96 w96 aic jcc`}
      >
        <Icon
          name="delete-left"
          style={s("fs28", blocked ? "textDisabled" : "text")}
        />
      </Touchable>
    </View>
  );
}
