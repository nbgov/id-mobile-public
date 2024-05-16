import { useCallback } from "react";
import Icon from "react-native-vector-icons/FontAwesome6";
import Touchable from "ui/views/touchable";
import Text from "ui/views/text";
import s from "ui/styles";

export default function NavItem({ id, icon, title, active, onPress }) {
  const color = active && "primary";

  const handlePress = useCallback(() => {
    onPress?.(id);
  }, [id]);

  return (
    <Touchable onPress={handlePress} opacityFeedback style={s`f1 aic jcc`}>
      <Icon name={icon} style={s("fs24", color)} />
      {title && <Text style={s("mt4 fs14", color)}>{title}</Text>}
    </Touchable>
  );
}
