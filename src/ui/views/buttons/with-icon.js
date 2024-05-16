import { memo } from "react";
import Icon from "react-native-vector-icons/FontAwesome6";
import { getTitleStyle } from "./title-style";
import s from "ui/styles";

export const withIcon = (Component) =>
  memo(({ icon, iconSize, iconStyle, children, ...props }) => {
    const titleStyle = getTitleStyle(props);

    return (
      <Component {...props}>
        <Icon
          name={icon}
          size={iconSize}
          style={s("mr8", titleStyle, iconStyle)}
        />
        {children}
      </Component>
    );
  });
