import { select } from "picofly/react";
import Paths from "ui/paths";
import Button from "ui/views/buttons/button";
import Text from "ui/views/text";
import Step from "./step";
import s from "ui/styles";
import { credIssue as t } from "i18n";

const vt = t.pin;

export default select((app) => ({
  complete: app.pin.set,
}))(Pin);

function Pin(props) {
  return (
    <Step title={vt.title} {...props}>
      <Text style={s`lh18`}>{vt.desc}</Text>
      <Button
        title={vt.action}
        path={Paths.PinSet}
        action="modal"
        style={s`mt24 asc minw256`}
      />
    </Step>
  );
}
