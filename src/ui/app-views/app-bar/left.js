import { useMemo } from "react";
import { View } from "react-native";
import { select } from "picofly/react";
import { spec } from "lib/selectors";
import { canPop, hasModal } from "store/router/selectors";
import Back from "./back";
import Close from "./close";
import s from "ui/styles";

export default select(spec({ canPop, hasModal }))(AppBarLeft);

function AppBarLeft({ canPop, hasModal, style }) {
  const LeftView = useMemo(() => (canPop ? Back : hasModal ? Close : View), []);

  return <LeftView style={s("mr8", style)} />;
}
