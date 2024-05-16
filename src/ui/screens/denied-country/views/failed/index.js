import { spec } from "lib/selectors";
import Icon from "react-native-vector-icons/FontAwesome6";
import { select } from "picofly/react";
import { countryCode } from "store/denied-country/selectors";
import NoCountry from "./no-country";
import NonSecureCountry from "./non-secure-country";
import Check from "./check";
import s from "ui/styles";

export default select(spec({ countryCode }))(Failed);

function Failed({ countryCode }) {
  return (
    <>
      {countryCode ? <NonSecureCountry /> : <NoCountry />}
      <Check style={s`mt32 w256`} />
    </>
  );
}
