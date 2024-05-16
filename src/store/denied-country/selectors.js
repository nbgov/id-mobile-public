import { DeniedCountryCodes } from "const";

export const isCountryAsk = (app) => !app.deniedCountry.showed;

export const isAllowedCountry = (app) =>
  !!countryCode(app) && !DeniedCountryCodes.includes(countryCode(app));

export const countryCode = (app) => app.deniedCountry.countryCode;
