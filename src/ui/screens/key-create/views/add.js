import { callback } from "lib/selectors";
import { select } from "picofly/react";
import { set } from "../actions";
import ProcessingButton from "ui/views/buttons/processing-button";
import { keyCreating as t } from "i18n";
import s from "ui/styles";

export default select(
  (app) => ({
    enabled:
      !!app.ui.keyCreate.key &&
      app.ui.keyCreate.agreeSaved &&
      app.ui.keyCreate.agreeNoDisclose,
    title: t.addKey,
    style: s`mh24`,
  }),
  callback("onPress", set),
)(ProcessingButton);
