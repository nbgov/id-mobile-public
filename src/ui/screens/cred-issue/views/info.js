import { memo } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import Text from "ui/views/text";
import HowWorksLink from "./how-works-link";
import { credIssue as t } from "i18n";
import s from "ui/styles";

export default memo(Info);

// TODO: move texts to i18n
function Info() {
  return (
    <View style={s`p16 br12 bgBackSecond`}>
      <InfoItem>
        <Text style={s`f1 fs16 lh20`}>
          Новы Лічбавы ID будзе бяспечна захаваны ў зашыфраваным выглядзе{" "}
          <HowWorksLink>толькі на вашым смартфоне</HowWorksLink>
        </Text>
      </InfoItem>

      <InfoItem style={s`mt12`}>
        <Text style={s`f1 fs16 lh20`}>{t.info2}</Text>
      </InfoItem>
    </View>
  );
}

const InfoItem = memo(({ children, style }) => (
  <View style={s("row", style)}>
    <Icon name="quote-right" style={s`w24 h24 mr8 fs20 primary`} />
    {children}
  </View>
));
