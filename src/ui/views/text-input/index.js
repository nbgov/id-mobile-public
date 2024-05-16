import { memo } from "react";
import { TextInput as RNTextInput } from "react-native";
import s from "ui/styles";

export default memo(TextInput);

function TextInput({ style, ...props }) {
  return <RNTextInput {...props} style={s("text", style)} />;
}
