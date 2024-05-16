import * as creds from "store/cred";

export const exportAll = async (app) => {
  const ui = app.ui.credExport;

  ui.exporting = true;

  // exporting can be a long sync operation
  // requestAnimationFrame to give UI time to update
  return new Promise((resolve) => {
    requestAnimationFrame(async () => {
      try {
        ui.data = creds.exportAll(app);
      } catch {
      } finally {
        ui.exporting = false;
        resolve();
      }
    });
  });
};
