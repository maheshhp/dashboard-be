import { searchCountries } from "../../../services/api";
import { CountrySearchRes } from "../../../services/api/api.types";

export const searchCountryResolver = async (
  parent: any,
  args: Record<any, any>
): Promise<Array<CountrySearchRes>> => {
  const searchString: string = args?.countryName;
  return searchCountries(searchString);
};
