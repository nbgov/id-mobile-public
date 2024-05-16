import { memo } from "react";
import Icon from "react-native-vector-icons/FontAwesome6";
import Text from "ui/views/text";
import { deniedCountry as t } from "i18n";
import s from "ui/styles";

export default memo(NoCountry);

function NoCountry() {
  return (
    <>
      <Icon name="triangle-exclamation" style={s`fs48 primary`} />
      <Text style={s`mt32 fs18 tc`}>{t.noCountry}</Text>
      <Text style={s`mt16 fs16 tj`}>{t.noCountryWarning}</Text>
    </>
  );
}
