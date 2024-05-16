import React, { memo } from "react";
import { Text as RNText } from "react-native";
import s from "ui/styles";

function Text({ style, ...props }) {
  return <RNText style={s("text", style)} {...props} />;
}

export default memo(Text);
