import { useCallback, useEffect, useRef } from "react";
import { Modal as RNModal, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { select } from "picofly/react";
import { callback } from "lib/selectors";
import { modalOptions } from "store/router/selectors";
import * as router from "store/router";
import s from "ui/styles";

export default select(
  modalOptions,
  callback("onCancel", router.modalCancel),
)(Modal);

function Modal({
  canCancel = true,
  animationType = "slide",
  statusBarTranslucent,
  onShow,
  onCancel,
  children,
  style,
  ...props
}) {
  // for some reason modal onShow sometimes do not work on Android
  // just wait a bit and call if not called before
  const showedRef = useRef();
  const handleShow = useCallback(
    (e) => {
      if (showedRef.current) return;
      showedRef.current = true;
      onShow?.();
    },
    [onShow],
  );
  useEffect(() => {
    setTimeout(handleShow, 500);
  }, []);

  const onRequestClose = useCallback(() => {
    if (!canCancel) return;
    onCancel?.();
  }, [canCancel, onCancel]);

  const Container = statusBarTranslucent ? View : SafeAreaView;
  style = s("f1", statusBarTranslucent && TranslucentStatusBarFixStyle, style);

  return (
    <RNModal
      transparent
      onShow={handleShow}
      {...{ animationType, statusBarTranslucent, onRequestClose }}
      {...props}
    >
      <Container style={style}>{children}</Container>
    </RNModal>
  );
}

const TranslucentStatusBarFixStyle = {
  marginBottom: -1 * StatusBar.currentHeight,
};
