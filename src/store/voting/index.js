import * as map from "lib/map";
import * as analytics from "store/analytics";
import { VotingStrategy } from "const";

export const loadAll = async (app) => {
  app.votingLoading = true;

  const analyticsLoaded = analytics.votingListLoadStart(app);

  try {
    const query = { strategy: VotingStrategy };
    const votings = await app.api.voting.list({ query });
    map.replace(app.votings, votings);

    analyticsLoaded(votings.length);
  } finally {
    app.votingLoading = false;
  }
};
