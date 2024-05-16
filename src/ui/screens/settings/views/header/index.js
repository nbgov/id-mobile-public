import { memo } from "react";
import { Image, View } from "react-native";
import Text from "ui/views/text";
import DebugOpen from "./debug-open";
import Did from "./did";
import { version } from "const";
import { settings as t } from "i18n";
import s from "ui/styles";
import Logo from "res/img/logo.png";

export default memo(SettingsHeader);

function SettingsHeader({ style }) {
  return (
    <View style={s("aic ph16 pv8 bgBackSecond", style)}>
      <DebugOpen />
      <Image source={Logo} style={s`w96 h96`} />
      <Text style={s`tc fw500 primary fs18`}>{t.appName}</Text>
      <Text style={s`tc fs12 fw500`}>
        {t.appVersion} {version}
      </Text>
      <Did style={s`mt8`} />
    </View>
  );
}
