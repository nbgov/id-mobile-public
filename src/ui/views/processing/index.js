import { memo } from "react";
import { ActivityIndicator } from "react-native";
import s, { colors } from "ui/styles";

export default memo(Processing);

function Processing({ style }) {
  return (
    <ActivityIndicator
      size="large"
      color={colors.primary}
      style={s("w48 h48", style)}
    />
  );
}
