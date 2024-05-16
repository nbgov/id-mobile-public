import { memo } from "react";
import Icon from "react-native-vector-icons/FontAwesome6";
import Link from "ui/views/link";
import s from "ui/styles";

export default memo(IconButton);

function IconButton({ style, icon, iconStyle, ...props }) {
  return (
    <Link style={s("h48 w48 jcc aic br24", style)} opacityFeedback {...props}>
      <Icon name={icon} style={s("fs24", iconStyle)} />
    </Link>
  );
}
