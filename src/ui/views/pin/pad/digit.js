import { memo, useCallback } from "react";
import s from "ui/styles";
import Text from "ui/views/text";
import Touchable from "ui/views/touchable";

export default memo(PinDigit);

function PinDigit({ blocked, digit, onPress }) {
  const handlePress = useCallback(() => {
    onPress?.(digit);
  }, [onPress, digit]);

  return (
    <Touchable
      enabled={!blocked}
      onPress={handlePress}
      opacityFeedback
      style={s`m16 h64 w64 aic jcc bgBack br32`}
    >
      <Text style={s("fs28 fw500", blocked && "textDisabled")}>{digit}</Text>
    </Touchable>
  );
}
