import { select } from "picofly/react";
import { callback } from "lib/selectors";
import { checkCountry } from "../../actions";
import ProcessingButton from "ui/views/buttons/processing-button";
import { common as ct } from "i18n";

export default select(
  (app) => ({
    title: ct.continue,
    processing: app.ui.deniedCountry.checking,
    enabled: app.ui.deniedCountry.confirmed,
  }),
  callback("onPress", checkCountry),
)(ProcessingButton);
