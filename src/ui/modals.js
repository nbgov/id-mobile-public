import { spec } from "lib/selectors";
import { Router } from "react-enroute";
import { select } from "picofly/react";
import { createStack } from "react-native-enroute";
import { modalLocation, modalPaths } from "store/router/selectors";
import Paths from "ui/paths";
import { colors } from "ui/styles";

import PinSet from "ui/screens/pin-set";
import PinAsk from "ui/screens/pin-ask";
import KeyCreate from "ui/screens/key-create";
import CredExport from "ui/screens/cred-export";
import Confirm from "ui/screens/confirm";
import PresentationAsk from "ui/screens/presentation-ask";
// import QrTgIssue from 'ui/screens/qr-tg-issue'

export default select(spec({ modalLocation, modalPaths }))(Modals);

function Modals({ modalLocation, modalPaths, onNavigateBack }) {
  const KeyCreateStack = stack(modalPaths, onNavigateBack);

  return (
    <Router location={modalLocation}>
      <PinSet path={Paths.PinSet} />
      <PinAsk path={Paths.PinAsk} />
      <KeyCreateStack path={Paths.KeyCreate}>
        <KeyCreate />
      </KeyCreateStack>
      <CredExport path={Paths.CredExport} />
      <Confirm path={Paths.Confirm} />
      <PresentationAsk path={Paths.PresentationAsk} />
      {/* <QrTgIssue path={Paths.QrTgIssue}/> */}
    </Router>
  );
}

const StackOptions = {
  headerShown: false,
  stackAnimation: "slide_from_right",
  statusBarColor: colors.statusbar,
  statusBarStyle: "dark",
};

const stack = (paths, onNavigateBack) =>
  createStack({
    paths,
    onNavigateBack,
    options: StackOptions,
  });
