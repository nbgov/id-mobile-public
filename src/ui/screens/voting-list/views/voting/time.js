import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import * as format from "lib/format";
import { select } from "picofly/react";
import { item } from "lib/selectors";
import Text from "ui/views/text";
import s from "ui/styles";
import { votingList as t } from "i18n";

export default select(item("voting"))(Status);

function Status({ voting = {}, style }) {
  const { status, startDate, endDate } = voting;

  const dateStr = format.dateRelative(endDate);

  return (
    <View style={s("f1 row aic", style)}>
      <Icon name="clock" size={12} style={s`mt2 mr6 textSecond`} />
      <Text style={s`mr8 fs12 textSecond`}>
        {t.endAt} {dateStr}
      </Text>
    </View>
  );
}
