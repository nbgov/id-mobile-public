import { select } from "picofly/react";
import { uiState } from "lib/selectors";
import State from "./state";
import Screen from "ui/views/screen";
import Modal from "ui/views/modal";
import Pin from "./views/pin";
import Header from "./views/header";
import s from "ui/styles";

export default select(uiState(State))(PinAskScreen);

function PinAskScreen(props) {
  return (
    <Modal {...props}>
      <Screen style={s`aic jcc bgBackSecond`}>
        <Header />
        <Pin style={s`mt24`} />
      </Screen>
    </Modal>
  );
}
