import { memo } from "react";
import { Switch as RNSwitch } from "react-native";
import { colors } from "ui/styles";

const trackColor = {
  true: colors.primaryContainer,
  false: colors.textDisabled,
};

export default memo(Switch);

function Switch({ value, ...props }) {
  return (
    <RNSwitch
      thumbColor={value ? colors.primary : colors.back}
      trackColor={trackColor}
      {...{ value }}
      {...props}
    />
  );
}
