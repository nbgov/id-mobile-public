import { memo, useEffect, useState } from "react";
import { View } from "react-native";
import Dots from "./dots";
import Pad from "./pad";
import s from "ui/styles";

const ErrorBlockDelayMs = 500;

export default memo(Pin);

function Pin({
  count = 6,
  activeCount,
  Special,
  error,
  blocked,
  onAddDigit,
  onRemoveDigit,
  style,
}) {
  const [errorUnblocked, setErrorUnblocked] = useState(false);

  useEffect(() => {
    if (error) {
      setTimeout(() => setErrorUnblocked(true), ErrorBlockDelayMs);
    } else {
      setErrorUnblocked(false);
    }
  }, [error]);

  blocked ||= error && !errorUnblocked;

  return (
    <View style={s("aic", style)}>
      <Dots {...{ count, activeCount, error }} />
      <Pad
        {...{ blocked, Special, onAddDigit, onRemoveDigit }}
        style={s`mt32`}
      />
    </View>
  );
}
