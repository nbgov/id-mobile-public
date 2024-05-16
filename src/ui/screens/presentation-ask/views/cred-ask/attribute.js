import { View } from "react-native";
import { select } from "picofly/react";
import { item } from "lib/selectors";
import { dotPathValue } from "lib/dot-path";
import Text from "ui/views/text";
import { common as ct } from "i18n";
import s from "ui/styles";

export default select(item("cred"))(Attribute);

function Attribute({ attribute, cred = {} }) {
  const attributeField = attribute.split(".").at(-1);
  const title =
    ct.credField[attribute] ?? ct.credField[attributeField] ?? attributeField;

  // TODO: value parsers
  let value = dotPathValue(cred, attribute) ?? "";
  value = ct.knownCredValues[value] ?? value;

  return (
    <View style={s`mt8 row aic`}>
      <Text style={s`mr8 primary b`}>{title}:</Text>
      <Text numberOfLines={1} style={s`f1 fw500`}>
        {value}
      </Text>
    </View>
  );
}
