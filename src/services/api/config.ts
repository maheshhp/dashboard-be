import dayJs from "dayjs";

export const getCountriesSearchUrl = (countryName: string): string => {
  return `https://restcountries.eu/rest/v2/name/${countryName}`;
};

export const getCurrencyRatesUrl = (): string => {
  return `http://data.fixer.io/api/${dayJs().format("YYYY-MM-DD")}`;
};
