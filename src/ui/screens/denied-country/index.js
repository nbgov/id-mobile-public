import { spec, uiState } from "lib/selectors";
import { View } from "react-native";
import { select } from "picofly/react";
import { isCountryAsk } from "store/denied-country/selectors";
import State from "./state";
import Ask from "./views/ask";
import Failed from "./views/failed";
import s from "ui/styles";

export default select(uiState(State), spec({ isCountryAsk }))(DeniedCountry);

function DeniedCountry({ isCountryAsk }) {
  return (
    <View style={s`f1 aic jcc p32 bgBackSecond`}>
      {isCountryAsk ? <Ask /> : <Failed />}
    </View>
  );
}
