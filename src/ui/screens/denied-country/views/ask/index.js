import { callback } from "lib/selectors";
import { select } from "picofly/react";
import Icon from "react-native-vector-icons/FontAwesome6";
import { openInstruction } from "ui/screens/denied-country/actions";
import Text from "ui/views/text";
import Confirm from "./confirm";
import Start from "./start";
import { deniedCountry as t } from "i18n";
import s from "ui/styles";

export default select(callback("onInstruction", openInstruction))(Ask);

function Ask({ onInstruction }) {
  return (
    <>
      <Icon name="hands-holding-child" style={s`fs48 primary`} />
      <Text style={s`mt32 fs18 tc`}>
        {t.ask} (
        <Text onPress={onInstruction} style={s`primary b u`}>
          {t.instruction}
        </Text>
        )
      </Text>
      <Confirm style={s`mt32`} />
      <Start style={s`mt32 w256`} />
    </>
  );
}
