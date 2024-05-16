import * as clipboard from "lib/clipboard";
import * as masterKey from "store/master-key";
import * as router from "store/router";

export const create = async (app) => {
  const ui = app.ui.keyCreate;

  ui.mnemonic = null;
  ui.key = null;
  ui.creating = true;

  // key creation is a long sync operation
  // requestAnimationFrame to give UI time to update
  return new Promise((resolve) => {
    requestAnimationFrame(async () => {
      try {
        const { mnemonic, key } = await masterKey.create(app);
        ui.mnemonic = mnemonic;
        ui.key = key;
      } catch {
      } finally {
        ui.creating = false;
        resolve();
      }
    });
  });
};

export const set = async (app) => {
  const { key } = app.ui.keyCreate;
  if (!key) return;

  await masterKey.set(app, key);

  router.modalClose(app);
};

export const copy = (app) => clipboard.copyString(app.ui.keyCreate.mnemonic);
