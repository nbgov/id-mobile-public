import { spec } from "lib/selectors";
import { select } from "picofly/react";
import { hasMasterKey } from "store/master-key/selectors";
import Paths from "ui/paths";
import Button from "ui/views/buttons/button";
import Text from "ui/views/text";
import Step from "./step";
import { credIssue as t } from "i18n";
import s from "ui/styles";

const vt = t.key;

export default select(spec({ hasMasterKey }))(Key);

function Key({ hasMasterKey, ...props }) {
  return (
    <Step title={vt.title} complete={hasMasterKey} {...props}>
      <Text style={s`lh18`}>{vt.desc}</Text>
      <Button
        title={vt.action}
        path={Paths.KeyCreate}
        action="modal"
        style={s`mt24 asc minw256`}
      />
    </Step>
  );
}
