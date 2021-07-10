// Country search API response types
interface SearchCurrency {
  code: string;
  name: string;
  symbol: string;
}

export interface CountrySearchRes {
  name: string;
  alpha3Code: string;
  population: number;
  currencies: Array<SearchCurrency>;
}
