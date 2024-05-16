import Countries from "countries-list/minimal/countries.en.min.json";

export const getCountryName = (alpha2) => Countries[alpha2];
