import { FlatList } from "react-native";
import { select } from "picofly/react";
import { listItemRender } from "lib/renders";
import { spec, callback, uiState } from "lib/selectors";
import { identity } from "lib/fns";
import { screen } from "store/router/selectors";
import * as voting from "store/voting";
import { votingIds } from "store/voting/selectors";
import { refresh } from "./actions";
import State from "./state";
import Screen from "ui/views/screen";
import Voting from "./views/voting";
import NoVotings from "./views/no-votings";
import { votingList as t } from "i18n";
import s from "ui/styles";

export default select(
  uiState(State),
  spec({ votingIds }),
  (app) => ({
    refreshing: app.ui.votingList.refreshing,
  }),
  callback("onRefresh", refresh),
  screen({
    shown: voting.loadAll,
  }),
)(VotingList);

function VotingList({ votingIds = [], refreshing, onRefresh }) {
  const renderItem = listItemRender(Voting);

  return (
    <Screen title={t.title}>
      <FlatList
        data={votingIds}
        renderItem={renderItem}
        keyExtractor={identity}
        refreshing={refreshing}
        ListEmptyComponent={NoVotings}
        onRefresh={onRefresh}
        contentContainerStyle={s`fg1`}
      />
    </Screen>
  );
}
