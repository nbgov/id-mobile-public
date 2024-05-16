import { partial } from "lib/fns";
import { hasPassport } from "store/cred/selectors";
import { location } from "store/router/selectors";
import * as router from "store/router";
import * as masterKey from "store/master-key";
import * as cred from "store/cred";
import * as pin from "store/pin";
import Paths from "ui/paths";
import { unlock as t } from "i18n";

export const init = (app) => (app.lock.locked = app.pin.set);

export const lock = async (app) => {
  app.lock.locked = true;

  cred.unload(app);
  masterKey.unset(app);

  app.lock.events.emit("locked");
};

export const unlock = async (app) => {
  await masterKey.loadSaved(app);
  await cred.loadSaved(app);

  app.lock.locked = false;
  app.lock.events.emit("unlocked");
};

export const unlockAsk = async (app) => {
  const ask = { reason: t.pinAskReason, canCancel: false, skipModal: true };
  const [res, close] = await pin.ask(app, ask);

  if (res !== pin.Result.Ok) {
    return res;
  }

  if (!location(app)) {
    const location = hasPassport(app) ? Paths.VotingList : Paths.CredList;
    router.push(app, location);
  }

  await unlock(app);
  close();

  return res;
};

export const onLocked = (app, fn) =>
  app.lock.events.on("locked", partial(fn, app));

export const onUnlocked = (app, fn) =>
  app.lock.events.on("unlocked", partial(fn, app));
