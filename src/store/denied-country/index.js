import { isAllowedCountry, isCountryAsk } from "./selectors";
import * as storage from "store/storage";

export const init = async (app) => {
  loadShowed(app);

  if (isCountryAsk(app)) {
    return false;
  }

  try {
    await check(app);
  } catch {
    return false;
  }

  return true;
};

export const check = async (app) => {
  try {
    await getCountry(app);

    if (isAllowedCountry(app)) {
      saveShowed(app);
    }
  } finally {
    app.deniedCountry.showed = true;
  }
};

export const clearData = (app) => storage.remove(app, StorageNs, ShowedKey);

const StorageNs = "deniedCountry";
const ShowedKey = "showed";

const loadShowed = (app) =>
  (app.deniedCountry.showed = !!storage.getBool(app, StorageNs, ShowedKey));

const saveShowed = (app) => storage.set(app, StorageNs, ShowedKey, true);

const getCountry = async (app) => {
  const { country } = await app.api.ipInfo.get();

  if (typeof country !== "string") return;
  if (country.length !== 2) return;

  app.deniedCountry.countryCode = country;
};
