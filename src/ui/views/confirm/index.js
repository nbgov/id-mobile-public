import { memo } from "react";
import { View } from "react-native";
import Text from "ui/views/text";
import { Button } from "ui/views/buttons";
import Touchable from "ui/views/touchable";
import { common as ct } from "i18n";
import s from "ui/styles";

export default memo(Confirm);

function Confirm({
  title,
  text,
  children,
  yesTitle = ct.yes,
  noTitle = ct.cancel,
  onYes,
  onNo,
}) {
  return (
    <View style={s`f1 jcfe bgTransparentBlack`}>
      <Touchable onPress={onNo} style={s`f1`} withoutFeedback />
      <View style={s`p16 pb24 bgBackSecond btlr24 btrr24`}>
        {title && <Text style={s`asc mb16 b fs18`}>{title}</Text>}
        {text && <Text style={s`asc mb16`}>{text}</Text>}
        {children}
        <View style={s`asc mt24 row`}>
          <Button
            title={noTitle}
            onPress={onNo}
            raised={false}
            border
            style={s`mh24`}
          />
          <Button title={yesTitle} onPress={onYes} style={s`mh24`} />
        </View>
      </View>
    </View>
  );
}
