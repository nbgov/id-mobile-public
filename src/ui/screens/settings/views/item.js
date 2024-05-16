import { memo } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import Link from "ui/views/link";
import Text from "ui/views/text";
import s from "ui/styles";

export default memo(SettingsItem);

function SettingsItem({
  title,
  icon,
  enabled = true,
  children,
  style,
  ...props
}) {
  return (
    <Link {...{ enabled }} {...props} style={s("h56 row aic ph16", style)}>
      {icon ? (
        <Icon
          name={icon}
          style={s("w32 fs24", enabled ? "primary" : "disabledPrimary")}
        />
      ) : (
        <View style={s`w32`} />
      )}
      <Text style={s("f1 ph16 fs16", enabled ? "text" : "textDisabled")}>
        {title}
      </Text>
      {children}
    </Link>
  );
}
