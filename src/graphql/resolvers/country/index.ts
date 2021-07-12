import { searchCountries, CountrySearchRes } from "../../../services/api";

export const searchCountryResolver = async (
  parent: any,
  args: Record<any, any>
): Promise<Array<CountrySearchRes>> => {
  const searchString: string = args?.countryName;
  return searchCountries(searchString);
};
