import { select } from "picofly/react";
import { callback, uiState } from "lib/selectors";
import { View } from "react-native";
import State from "./state";
import { create } from "./actions";
import Modal from "ui/views/modal";
import Screen from "ui/views/screen";
import Text from "ui/views/text";
import Mnemonic from "./views/mnemonic";
import Copy from "./views/copy";
import Recreate from "./views/recreate";
import AgreeSaved from "./views/agree-saved";
import AgreeNoDisclose from "./views/agree-no-disclose";
import Add from "./views/add";
import Cancel from "./views/cancel";
import { keyCreating as t } from "i18n";
import s from "ui/styles";

export default select(
  uiState(State),
  callback("onShow", create),
)(KeyCreateScreen);

function KeyCreateScreen(props) {
  return (
    <Modal {...props}>
      <Screen title={t.title} scrollable style={s`ph16 bgBackSecond`}>
        <Text style={s`mt8`}>{t.desc}</Text>
        <Mnemonic style={s`mt16`} />
        <View style={s`row jcsb`}>
          <Recreate />
          <Copy />
        </View>
        <Text style={s`mt8`}>{t.noRecovery}</Text>
        <AgreeSaved style={s`mt8`} />
        <Text style={s`mt16`}>{t.noDisclose}</Text>
        <AgreeNoDisclose style={s`mt8`} />
        <View style={s`mv24 row jcc`}>
          <Cancel />
          <Add />
        </View>
      </Screen>
    </Modal>
  );
}
