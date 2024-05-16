import { itemRender } from "lib/renders";
import { memo } from "react";
import { View } from "react-native";
import Text from "ui/views/text";
import Attribute from "./attribute";
import Bound from "./bound";
import s from "ui/styles";

export default memo(CredAsk);

function CredAsk({ credAsk = {} }) {
  const { id, reason, ask = {} } = credAsk;
  const { attributes, bounds = {} } = ask;

  const attributeViews = attributes.map(
    itemRender(Attribute, {
      as: "attribute",
      props: { id },
    }),
  );

  const boundViews = Object.entries(bounds)
    .map(([attribute, { min, max }]) => ({ attribute, min, max }))
    .map(itemRender(Bound, { as: null }));

  return (
    <>
      {reason && <Text style={s`mv8 note`}>{reason}</Text>}
      <View style={s`ml16 pb24 bcPrimaryContainer bbw1`}>
        {attributeViews}
        {boundViews}
      </View>
    </>
  );
}
