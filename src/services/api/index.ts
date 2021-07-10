import axios from "axios";
import { CountrySearchRes, CurrencyRatesRes } from "./api.types";
import { getCountriesSearchUrl, getCurrencyRatesUrl } from "./config";

// Generic request method to fetch data from downstream services
const makeRequest = async (
  url: string,
  method: "get" | "post",
  body: Record<string, any> | null = null,
  headers: Record<string, string> = {},
  params: Record<string, string> = {}
): Promise<any> => {
  const response = await axios({
    method,
    url,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    params,
    data: body,
  });
  return response.data;
};

export const searchCountries = async (
  countryName: string
): Promise<Array<CountrySearchRes>> => {
  try {
    const searchRes = await makeRequest(
      getCountriesSearchUrl(countryName),
      "get",
      null,
      {},
      {
        fields: "name;population;currencies",
      }
    );
    return searchRes;
  } catch (error) {
    // Since country search API returns 404 when no country
    // matches the search string, send specific message to
    // handle better in UI
    if (error.response?.status === 404) {
      throw new Error("COUNTRY_NOT_FOUND_ERROR");
    }
    throw new Error("COUNTRY_FETCH_ERROR");
  }
};

export const getCurrencyRates = async (
  currencySymbols: Array<string>
): Promise<CurrencyRatesRes> => {
  try {
    const currencySymbolString = currencySymbols.join(",");
    const currencyRatesRes = await makeRequest(
      getCurrencyRatesUrl(),
      "get",
      null,
      {},
      {
        symbols: currencySymbolString,
        access_key: String(process.env.CURRENCY_API_KEY),
      }
    );
    if (!currencyRatesRes.success) {
      throw new Error(currencyRatesRes.error?.info);
    }
    return {
      base: currencyRatesRes.base,
      rates: Object.keys(currencyRatesRes.rates).map((key: string) => ({
        country: key,
        rate: currencyRatesRes.rates[key],
      })),
    };
  } catch (error) {
    console.error(error.message);
    throw new Error("CURRENCY_FETCH_ERROR");
  }
};
