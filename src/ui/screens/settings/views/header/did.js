import Icon from "react-native-vector-icons/FontAwesome6";
import { spec, callback } from "lib/selectors";
import { select } from "picofly/react";
import { View } from "react-native";
import { nbGovDid } from "store/keys/selectors";
import { copyNbGovDid } from "../../actions";
import Touchable from "ui/views/touchable";
import Text from "ui/views/text";
import { settings as t } from "i18n";
import s from "ui/styles";

export default select(
  spec({ nbGovDid }),
  callback("onDidCopy", copyNbGovDid),
)(Did);

function Did({ nbGovDid, onDidCopy, style }) {
  if (!nbGovDid) {
    return null;
  }

  return (
    <View style={s("row aic", style)}>
      <Text style={s`mr8 primary fw500`}>{t.did}</Text>
      <Touchable
        onPress={onDidCopy}
        opacityFeedback
        hitSlop={8}
        style={s`f1 row aic`}
      >
        <Text ellipsizeMode="middle" numberOfLines={1} style={s`f1 mr8`}>
          {nbGovDid}
        </Text>
        <Icon name="copy" style={s`fs16`} />
      </Touchable>
    </View>
  );
}
