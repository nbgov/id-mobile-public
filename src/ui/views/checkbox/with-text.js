import { memo } from "react";
import { Text } from "react-native";
import s from "ui/styles";

export const withText = (Component) =>
  memo(
    ({
      text,
      textStyle,
      enabled = true,
      vertical = false,
      children,
      style,
      ...props
    }) => (
      <Component
        style={s(vertical ? "col" : "row", style)}
        {...{ enabled }}
        {...props}
      >
        <Text style={s("ml16", enabled ? "text" : "textDisabled", textStyle)}>
          {text}
        </Text>
        {children}
      </Component>
    ),
  );
