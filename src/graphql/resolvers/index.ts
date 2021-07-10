import { searchCountryResolver } from "./country";
import { currencyRatesResolver } from "./currency";

export default {
  Query: {
    searchCountries: searchCountryResolver,
    currencyRates: currencyRatesResolver,
  },
};
