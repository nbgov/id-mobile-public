import { FlatList } from "react-native";
import { select } from "picofly/react";
import { spec } from "lib/selectors";
import { listItemRender } from "lib/renders";
import { credIds } from "store/cred/selectors";
import { issuing } from "store/kyc/selectors";
import { identity } from "lib/fns";
import Screen from "ui/views/screen";
import Cred from "./views/cred";
import IssuingCred from "ui/screens/cred-list/views/status-cred";
import NoCreds from "./views/no-creds";
import s from "ui/styles";
import { credList as t } from "i18n";

export default select(spec({ credIds, issuing }))(CredList);

function CredList({ credIds = [], issuing }) {
  const renderItem = listItemRender(Cred);

  return (
    <Screen title={t.title}>
      <FlatList
        data={credIds}
        renderItem={renderItem}
        keyExtractor={identity}
        ListEmptyComponent={issuing ? IssuingCred : NoCreds}
        bounces={false}
        contentContainerStyle={s`fg1`}
      />
    </Screen>
  );
}
