import { memo } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import Text from "ui/views/text";
import s from "ui/styles";

export default memo(CredCard);

function CredCard({ title, icon, countryCode, children }) {
  return (
    <View style={s`card shadow mh16 mv6 ph16 btw4 bcPrimary`}>
      <View style={s`row aic pv4 jcsb`}>
        {icon ? <Icon name={icon} size={24} style={s`primary`} /> : <View />}

        <Text style={s`pv4 primary tc fs18 b ttu`}>{title}</Text>

        {countryCode ? (
          <View style={s`w32 h24 aic jcc br12 bw2 bcPrimary`}>
            <Text style={s`primary b`}>{countryCode}</Text>
          </View>
        ) : (
          <View />
        )}
      </View>

      <View style={s`row pv16 btw1 bcPrimary`}>{children}</View>
    </View>
  );
}
