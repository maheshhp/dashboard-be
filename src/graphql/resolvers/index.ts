import { searchCountryResolver } from "./country";

export default {
  Query: {
    searchCountries: searchCountryResolver,
  },
};
