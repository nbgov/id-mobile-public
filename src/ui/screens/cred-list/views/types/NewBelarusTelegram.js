import { memo } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { select } from "picofly/react";
import { item } from "lib/selectors";
import Text from "ui/views/text";
import { common as ct } from "i18n";
import s from "ui/styles";

export default select(item("cred"))(NewBelarusTelegram);

function NewBelarusTelegram({ cred = {} }) {
  const { type, credentialSubject } = cred;
  const { id, hasGolos } = credentialSubject;

  const title = ct.credName[type];
  const hasGolosStr = hasGolos ? ct.yes : ct.no;

  return (
    <View style={s`card shadow btw4 bcTelegram`}>
      <View style={s`row aic pv4 jcsb`}>
        <Icon name="telegram" size={24} style={s`telegram`} />
        <Text style={s`pv4 telegram tc fs18 fw500 ttu`}>{title}</Text>
        <View style={s`w32`} />
      </View>

      <View style={s`pv16 btw1 bcTelegram`}>
        <Row title={ct.credFieldTg.id} value={id} />
        <Row title={ct.credFieldTg.hasGolos} value={hasGolosStr} />
      </View>
    </View>
  );
}

const Row = memo(({ title, value, style }) => (
  <View style={s("mt4 row wrap", style)}>
    <Text style={s`mr8 telegram fw500`}>{title}:</Text>
    <Text style={s`fw500`}>{value}</Text>
  </View>
));
