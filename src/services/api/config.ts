export const getCountriesSearchUrl = (countryName: string): string => {
  return `https://restcountries.eu/rest/v2/name/${countryName}`;
};
