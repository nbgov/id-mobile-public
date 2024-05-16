import { memo, useMemo } from "react";
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { colors } from "ui/styles";

export default memo(Touchable);

function Touchable({
  enabled = true,
  borderless = false,
  withoutFeedback = false,
  opacityFeedback = false,
  rippleColor = colors.primaryContainer,
  style,
  children,
  ...props
}) {
  props = { ...props, disabled: !enabled };

  if (withoutFeedback) {
    return (
      <TouchableWithoutFeedback {...props}>
        <View {...{ children, style }} />
      </TouchableWithoutFeedback>
    );
  }

  if (opacityFeedback || Platform.OS !== "android") {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        {...{ children, style }}
        {...props}
      />
    );
  }

  const background = useMemo(
    () =>
      rippleColor
        ? TouchableNativeFeedback.Ripple(rippleColor, borderless)
        : borderless
          ? TouchableNativeFeedback.SelectableBackgroundBorderless()
          : TouchableNativeFeedback.SelectableBackground(),
    [rippleColor, borderless],
  );

  return (
    <TouchableNativeFeedback {...{ background }} {...props}>
      <View {...{ children, style }} />
    </TouchableNativeFeedback>
  );
}
