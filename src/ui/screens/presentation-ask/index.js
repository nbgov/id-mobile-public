import { FlatList } from "react-native";
import { select } from "picofly/react";
import { listItemRender } from "lib/renders";
import { callback, effect } from "lib/selectors";
import * as router from "store/router";
import * as presentation from "store/presentation";
import Modal from "ui/views/modal";
import Text from "ui/views/text";
import Confirm from "ui/views/confirm";
import CredAsk from "./views/cred-ask";
import Uri from "./views/uri";
import { presentationAsk as t, common as ct } from "i18n";

export default select(
  (app) => ({
    ask: app.presentation.currentAsk,
  }),
  callback("onAllow", presentation.allow),
  callback("onDeny", presentation.deny),
  effect({
    init: (app) =>
      router.once(
        app,
        "modalClosed",
        (app, canceled) => canceled && presentation.deny(app),
      ),
  }),
)(PresentationAsk);

function PresentationAsk({ ask = {}, onAllow, onDeny }) {
  const { cfg, uri } = ask;
  const { credAsks } = cfg ?? {};

  const askStr = (!uri ? t.service + " " : "") + t.ask;
  const renderItem = listItemRender(CredAsk, { as: "credAsk" });

  return (
    <Modal statusBarTranslucent>
      <Confirm
        title={t.title}
        yesTitle={ct.allow}
        noTitle={ct.reject}
        onYes={onAllow}
        onNo={onDeny}
      >
        {uri && <Uri uri={uri} />}
        <Text>{askStr}</Text>
        <FlatList
          data={credAsks}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </Confirm>
    </Modal>
  );
}

const keyExtractor = (credAsk, i) => `${credAsk.id}-${i}`;
