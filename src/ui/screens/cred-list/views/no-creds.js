import { memo } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import Paths from "ui/paths";
import Text from "ui/views/text";
import { Button } from "ui/views/buttons";
import s from "ui/styles";
import { credList as t } from "i18n";

export default memo(NoCreds);

// TODO: i18n
function NoCreds() {
  return (
    <View style={s`f1 aic jcc ph32 pv8 bgBackSecond`}>
      <Icon name="passport" size={48} style={s`text`} />
      <Text style={s`mt16 tc fs16 lh24`}>
        У вас яшчэ няма{"\n"}
        <Text style={s`primary b`}>Лічбавага ID</Text>
        {"\n\n"}
        Жадаеце аформіць?
      </Text>
      <Button
        title={t.issue}
        path={Paths.CredIssue}
        style={s`mt24 asc minw256`}
      />
    </View>
  );
}
