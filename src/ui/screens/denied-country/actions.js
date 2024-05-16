import * as init from "store/init";
import * as link from "lib/link";
import * as deniedCountry from "store/denied-country";
import { isAllowedCountry } from "store/denied-country/selectors";
import { VPNInstructionUrl } from "const";

export const checkCountry = async (app) => {
  const ui = app.ui.deniedCountry;

  ui.checking = true;

  try {
    await deniedCountry.check(app);

    if (isAllowedCountry(app)) {
      await init.run(app);
    }
  } catch {
  } finally {
    ui.checking = false;
  }
};

export const openInstruction = () => link.site(VPNInstructionUrl);
