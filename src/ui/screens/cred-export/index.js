import { select } from "picofly/react";
import { callback, uiState } from "lib/selectors";
import { exportAll } from "./actions";
import State from "./state";
import Modal from "ui/views/modal";
import Screen from "ui/views/screen";
import Text from "ui/views/text";
import Data from "./views/data";
import { credExport as t } from "i18n";
import s from "ui/styles";

export default select(
  uiState(State),
  callback("onShow", exportAll),
)(KeyExportScreen);

function KeyExportScreen(props) {
  return (
    <Modal {...props}>
      <Screen title={t.title} scrollable style={s`ph16 bgBackSecond`}>
        <Text style={s`mt8`}>{t.desc}</Text>
        <Data />
      </Screen>
    </Modal>
  );
}
