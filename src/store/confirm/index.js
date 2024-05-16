import * as router from "store/router";
import * as analytics from "store/analytics";
import Paths from "ui/paths";

export const ask = (app, ask) =>
  new Promise((resolve) => {
    analytics.confirmAsked(app, ask);
    app.confirm.asks.push({ ...ask, resolve });
    router.modal(app, Paths.Confirm);
  });

export const yes = (app) => resolve(app, true);

export const no = (app) => resolve(app, false);

const resolve = (app, yes) => {
  const ask = { ...app.confirm.currentAsk };
  delete ask.resolve;
  yes ? analytics.confirmYes(app, ask) : analytics.confirmNo(app, ask);

  router.modalClose(app);
  app.confirm.asks.shift()?.resolve(yes);

  if (app.confirm.currentAsk) {
    router.modal(app, Paths.Confirm);
  }
};
