import { View } from "react-native";
import { memo, useEffect, useMemo } from "react";
import { WebView } from "react-native-webview";
import { useWebViewMessage } from "react-native-react-bridge";
import s from "ui/styles";

export default memo(WebBridge);

function WebBridge({
  uri,
  html,
  visible,
  onMsg = () => {},
  emitRef,
  style,
  ...props
}) {
  const { ref, emit, onMessage } = useWebViewMessage(onMsg);

  useEffect(() => {
    emitRef.current = emit;

    return () => {
      emitRef.current = null;
    };
  }, [emitRef, emit]);

  const source = useMemo(
    () => (uri && { uri }) || (html && { html }),
    [uri, html],
  );
  style = visible ? style : s("abs w0 h0", style);

  return (
    <View style={style}>
      <WebView {...{ source, ref, onMessage }} {...props} />
    </View>
  );
}
