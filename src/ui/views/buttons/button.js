import { memo } from "react";
import { View } from "react-native";
import Link from "ui/views/link";
import Text from "ui/views/text";
import { getTitleStyle } from "./title-style";
import s from "ui/styles";

export default memo(Button);

function Button({
  title,
  enabled = true,
  raised = true,
  accent = false,
  border = false,
  style,
  viewStyle,
  titleStyle,
  children,
  ...props
}) {
  const styleProps = { raised, enabled, accent, border, viewStyle, titleStyle };
  viewStyle = getViewStyle(styleProps);
  titleStyle = getTitleStyle(styleProps);

  return (
    <Link
      style={s("h48 minw64 maxw320", style)}
      opacityFeedback
      {...{ enabled }}
      {...props}
    >
      <View style={viewStyle}>
        {children}
        {title && <Text style={titleStyle}>{title}</Text>}
      </View>
    </Link>
  );
}

const getViewStyle = ({ raised, enabled, accent, border, viewStyle }) =>
  s(
    "row f1 jcc aic ph24 br24",
    raised &&
      (enabled
        ? accent
          ? "bgAccent"
          : "bgPrimary"
        : accent
          ? "bgDisabledAccent"
          : "bgDisabledPrimary"),
    border && "bw1 bcPrimary",
    viewStyle,
  );
