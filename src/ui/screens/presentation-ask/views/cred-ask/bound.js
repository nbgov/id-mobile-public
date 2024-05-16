import { memo } from "react";
import { View } from "react-native";
import { tpl } from "lib/tpl";
import * as format from "lib/format";
import Text from "ui/views/text";
import { common as ct } from "i18n";
import s from "ui/styles";

export default memo(Bound);

function Bound({ attribute, min, max }) {
  const attributeField = attribute.split(".").at(-1);
  const title =
    ct.credField[attribute] ?? ct.credField[attributeField] ?? attributeField;

  // TODO: parse schema
  const value = formatValue(min, max);

  return (
    <View style={s`mt8 row aic`}>
      <Text style={s`mr8 primary b`}>{title}:</Text>
      <Text numberOfLines={1} style={s`f1 fw500`}>
        {value}
      </Text>
    </View>
  );
}

const formatValue = (min, max) => {
  min = formatBound(min);
  max = formatBound(max);

  if (min !== undefined && max !== undefined) {
    return tpl(ct.boundMinMax, { min, max });
  }

  if (min !== undefined) {
    return tpl(ct.boundMin, { min });
  }

  if (max !== undefined) {
    return tpl(ct.boundMax, { max });
  }

  return "?";
};

const formatBound = (bound) =>
  typeof bound === "string" ? format.date(bound) : bound;
