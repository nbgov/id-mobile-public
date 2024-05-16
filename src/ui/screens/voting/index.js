import { useCallback } from "react";
import { select } from "picofly/react";
import { callback, effect, item, spec, uiState } from "lib/selectors";
import { tpl } from "lib/tpl";
import { votingBaseUrl } from "store/config/selectors";
import { emitRef } from "./selectors";
import State from "./state";
import { loadingStarted, loadingEnded, setUri, bridgeMsg } from "./actions";
import injectedJavaScript from "./inject-api";
import WebBridge from "ui/views/web-bridge";
import Screen from "ui/views/screen";
import { VotingStrategy, Debug } from "const";
import { voting as t } from "i18n";
import s from "ui/styles";

export default select(
  uiState(State),
  item("voting"),
  spec({ emitRef, votingBaseUrl }),
  effect({
    init: loadingStarted,
    getDeps: (app, props) => [props.id],
  }),
  callback("onUriChanged", setUri),
  callback("onMsg", bridgeMsg),
  callback("onLoadEnd", loadingEnded),
)(Voting);

function Voting({
  id,
  voting = {},
  emitRef,
  votingBaseUrl,
  onMsg,
  onUriChanged,
  onLoadEnd,
}) {
  const { code = "" } = voting;
  const title = tpl(t.title, { code });
  const uri = `${votingBaseUrl}/${id}?_credsStrategy=${VotingStrategy}&lng=be`;

  const onNavigationStateChange = useCallback(
    (state) => {
      onUriChanged?.(state.url);
    },
    [onUriChanged],
  );

  return (
    <Screen {...{ title }}>
      <WebBridge
        uri={uri}
        injectedJavaScript={injectedJavaScript}
        emitRef={emitRef}
        onNavigationStateChange={onNavigationStateChange}
        onMsg={onMsg}
        onLoadEnd={onLoadEnd}
        webviewDebuggingEnabled={Debug.votingWebView}
        style={s`f1`}
        visible
        startInLoadingState
      />
    </Screen>
  );
}
