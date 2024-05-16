import { select } from "picofly/react";
import { life, uiState } from "lib/selectors";
import { View } from "react-native";
import * as analytics from "store/analytics";
import State from "./state";
import Screen from "ui/views/screen";
import Modal from "ui/views/modal";
import Header from "./views/header";
import Pin from "./views/pin";
import s from "ui/styles";

export default select(
  uiState(State),
  life({
    init: analytics.pinSetStart,
    clean: analytics.pinSetClose,
  }),
)(PinSetScreen);

function PinSetScreen() {
  return (
    <Modal>
      <Screen scrollable contentContainerStyle={s`fg1 bgBackSecond`}>
        <View style={s`ph16 pv8 f1 aic jcc`}>
          <Header />
          <Pin style={s`mt48`} />
        </View>
      </Screen>
    </Modal>
  );
}
