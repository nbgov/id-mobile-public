import Icon from "react-native-vector-icons/FontAwesome6";
import { select } from "picofly/react";
import { item } from "lib/selectors";
import s from "ui/styles";

export default select(item("voting"))(Status);

// TODO: timer if started or not started yet
function Status({ voting = {} }) {
  const { status } = voting;

  if (status !== "started") {
    return null;
  }

  return <Icon name="fire" size={16} style={s`mt2 primary`} />;
}
