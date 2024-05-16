import { spec } from "lib/selectors";
import { select } from "picofly/react";
import { getCountryName } from "lib/country";
import { tpl } from "lib/tpl";
import Icon from "react-native-vector-icons/FontAwesome6";
import { countryCode } from "store/denied-country/selectors";
import Text from "ui/views/text";
import { deniedCountry as t } from "i18n";
import s from "ui/styles";

export default select(spec({ countryCode }))(NonSecureCountry);

function NonSecureCountry({ countryCode }) {
  const country = getCountryName(countryCode);

  return (
    <>
      <Icon name="ban" style={s`fs48 primary`} />
      <Text style={s`mt32 fs18 tc`}>{tpl(t.country, { country })}</Text>
      <Text style={s`mt16 fs16 tj`}>{t.warning}</Text>
    </>
  );
}
