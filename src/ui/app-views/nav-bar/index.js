import { callback, spec } from "lib/selectors";
import { View } from "react-native";
import { select } from "picofly/react";
import { root } from "store/router/selectors";
import * as router from "store/router";
import Item from "./item";
import Paths from "ui/paths";
import s from "ui/styles";
import { navBar as t } from "i18n";

const Items = [
  { id: Paths.VotingList, icon: "person-booth", title: t.votings },
  { id: Paths.CredList, icon: "passport", title: t.creds },
  { id: Paths.Settings, icon: "gear", title: t.settings },
];

export default select(
  () => ({
    items: Items,
  }),
  spec({ root }),
  callback("onItemPress", (app, props, id) => {
    router.reset(app, id);
  }),
)(NavBar);

function NavBar({ items = [], root, onItemPress }) {
  const views = items.map((item) => (
    <Item
      key={item.id}
      onPress={onItemPress}
      active={item.id === root}
      {...item}
    />
  ));

  return <View style={s`h64 row btw1 el10 bcBack bgBackSecond`}>{views}</View>;
}
