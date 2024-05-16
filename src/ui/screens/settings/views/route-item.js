import { memo } from "react";
import Icon from "react-native-vector-icons/FontAwesome6";
import Item from "./item";
import s from "ui/styles";

export default memo(RouteItem);

function RouteItem({ children, ...props }) {
  return (
    <Item {...props}>
      {children}
      <Icon name="chevron-right" style={s`fs16 textDisabled`} />
    </Item>
  );
}
