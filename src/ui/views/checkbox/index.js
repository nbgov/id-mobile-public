import { memo } from "react";
import Icon from "react-native-vector-icons/FontAwesome6";
import Touchable from "ui/views/touchable";
import s from "ui/styles";

export default memo(Checkbox);

function Checkbox({ enabled = true, checked, children, style, ...props }) {
  const name = checked ? "square-check" : "square";
  const color = enabled ? "primary" : "disabledPrimary";

  return (
    <Touchable
      opacityFeedback
      style={s("p8 aic", style)}
      {...{ enabled }}
      {...props}
    >
      <Icon name={name} style={s("fs24", color)} />
      {children}
    </Touchable>
  );
}
