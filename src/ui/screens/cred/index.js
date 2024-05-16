import { Text } from "react-native";
import { select } from "picofly/react";
import { item } from "lib/selectors";
import Screen from "ui/views/screen";

export default select(item("cred"))(Cred);

function Cred({ cred = {} }) {
  const { credentialSubject } = cred;
  const { docId } = credentialSubject;

  return (
    <Screen title={docId}>
      <Text>YYY</Text>
    </Screen>
  );
}
