import { memo } from "react";
import Switch from "ui/views/switch";
import Item from "./item";

export default memo(SwitchItem);

function SwitchItem({ title, icon, onPress, ...props }) {
  return (
    <Item {...{ title, icon, onPress }}>
      <Switch onValueChange={onPress} {...props} />
    </Item>
  );
}
