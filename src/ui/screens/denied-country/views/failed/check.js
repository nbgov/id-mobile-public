import { select } from "picofly/react";
import { callback } from "lib/selectors";
import { checkCountry } from "../../actions";
import ProcessingButton from "ui/views/buttons/processing-button";
import { common as ct } from "i18n";

export default select(
  (app) => ({
    title: ct.check,
    processing: app.ui.deniedCountry.checking,
  }),
  callback("onPress", checkCountry),
)(ProcessingButton);
