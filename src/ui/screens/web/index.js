import { memo, useMemo } from "react";
import { WebView } from "react-native-webview";
import Screen from "ui/views/screen";
import s from "ui/styles";
import { web as t } from "i18n";

export default memo(Web);

function Web({ title = t.defaultTitle, uri }) {
  title = decodeURIComponent(title);
  uri = decodeURIComponent(uri);

  const source = useMemo(() => ({ uri }), [uri]);

  return (
    <Screen {...{ title }}>
      <WebView {...{ source }} style={s`f1`} />
    </Screen>
  );
}
