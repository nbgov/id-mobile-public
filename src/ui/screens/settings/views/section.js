import { memo } from "react";
import { View } from "react-native";
import Text from "ui/views/text";
import s from "ui/styles";

export default memo(SettingsSection);

function SettingsSection({ title, children, style }) {
  return (
    <View style={s("bgBackSecond pt8", style)}>
      <Text style={s`ml16 pb8 primary fw500`}>{title}</Text>
      {children}
    </View>
  );
}
