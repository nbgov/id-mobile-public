import { Router } from "react-enroute";
import { createStack } from "react-native-enroute";
import { select } from "picofly/react";
import { spec, callback } from "lib/selectors";
import { paths, location } from "store/router/selectors";
import * as router from "store/router";
import { colors } from "ui/styles";
import Paths from "./paths";

import CredIssue from "ui/screens/cred-issue";
import CredList from "ui/screens/cred-list";
import Cred from "ui/screens/cred";
import VotingList from "ui/screens/voting-list";
import Voting from "ui/screens/voting";
import Settings from "ui/screens/settings";
import Web from "ui/screens/web";

export default select(
  spec({ location, paths }),
  callback("onNavigateBack", router.pop),
)(Routes);

function Routes({ location, paths, onNavigateBack }) {
  const CredsStack = stack(paths, onNavigateBack);
  const VotingStack = stack(paths, onNavigateBack);
  const SettingsStack = stack(paths, onNavigateBack);

  return (
    <Router {...{ location }}>
      <CredsStack path={Paths.CredList}>
        <CredList />
        <Cred path={Paths.Cred} />
        <CredIssue path={Paths.CredIssue} />
        <Web path={Paths.Web} />
      </CredsStack>
      <VotingStack path={Paths.VotingList}>
        <VotingList />
        <Voting path={Paths.Voting} />
      </VotingStack>
      <SettingsStack path={Paths.Settings}>
        <Settings />
      </SettingsStack>
    </Router>
  );
}

const StackOptions = {
  headerShown: false,
  stackAnimation: "slide_from_right",
  statusBarColor: colors.statusbar,
  statusBarStyle: "dark",
};

const stack = (paths, onNavigateBack) =>
  createStack({
    paths,
    onNavigateBack,
    options: StackOptions,
  });
