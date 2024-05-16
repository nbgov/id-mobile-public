import * as voting from "store/voting";

export const refresh = async (app) => {
  const ui = app.ui.votingList;
  if (ui.refreshing) return;

  ui.refreshing = true;

  try {
    await voting.loadAll(app);
  } catch {
    alert("Error refreshing voting list");
  } finally {
    ui.refreshing = false;
  }
};
