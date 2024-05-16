import { callback } from "lib/selectors";
import { View } from "react-native";
import { select } from "picofly/react";
import * as cm from "store/cm";
import { next } from "../actions";
import Button from "ui/views/buttons/button";
import Text from "ui/views/text";
import Step from "./step";
import s from "ui/styles";
import { credIssue as t, common as ct } from "i18n";

const vt = t.cm;

export default select(
  (app) => ({
    complete: app.cm.allowed,
  }),
  callback("onConfirm", cm.requestPermission),
  callback("onSkip", next),
)(Cm);

function Cm({ onConfirm, onSkip, ...props }) {
  return (
    <Step title={vt.title} {...props}>
      <Text style={s`lh18`}>{vt.desc}</Text>
      <View style={s`mt24 jcc row`}>
        <Button
          title={ct.skip}
          raised={false}
          onPress={onSkip}
          style={s`mh24`}
        />
        <Button title={ct.enable} onPress={onConfirm} style={s`mh24`} />
      </View>
    </Step>
  );
}
