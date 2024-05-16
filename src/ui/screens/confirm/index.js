import { select } from "picofly/react";
import { callback } from "lib/selectors";
import * as confirm from "store/confirm";
import Modal from "ui/views/modal";
import Confirm from "ui/views/confirm";

export default select(
  (app) => ({
    title: app.confirm.currentAsk?.title,
    text: app.confirm.currentAsk?.text,
    yesTitle: app.confirm.currentAsk?.yesTitle,
    noTitle: app.confirm.currentAsk?.noTitle,
  }),
  callback("onYes", confirm.yes),
  callback("onNo", confirm.no),
)(ConfirmScreen);

function ConfirmScreen(props) {
  return (
    <Modal animationType="fade" statusBarTranslucent>
      <Confirm {...props} />
    </Modal>
  );
}
