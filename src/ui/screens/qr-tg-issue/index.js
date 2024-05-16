import { View } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from "react-native-vision-camera";
import { select } from "picofly/react";
import { IconButton } from "ui/views/buttons";
import Modal from "ui/views/modal";
import Text from "ui/views/text";
import s from "ui/styles";
import { qrTgIssue as t } from "i18n";

export default select()(QrTgIssue);

function QrTgIssue() {
  const device = useCameraDevice("back");
  const codeScanner = useCodeScanner({
    codeTypes: ["qr"],
    onCodeScanned: (codes) => {
      console.log(`Scanned ${codes.length} codes!`);
    },
  });

  return (
    <Modal>
      <View style={s`f1 aic jcc bgBlack`}>
        {device ? (
          <Camera {...{ device, codeScanner }} isActive style={s`f1 ass`} />
        ) : (
          <Text style={s`fs16 textInvert`}>{t.noCamera}</Text>
        )}
        <IconButton
          action="pop"
          icon="xmark"
          style={s`abs r16 t48`}
          iconStyle={s`fs32 textInvert`}
          borderless
        />
      </View>
    </Modal>
  );
}
