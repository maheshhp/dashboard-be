import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type CountryCurrency {
    code: String!
    name: String!
    symbol: String!
  }
  type Country {
    name: String!
    alpha3Code: String!
    population: Float!
    currencies: [CountryCurrency!]!
  }
  type Rate {
    country: String!
    rate: Float!
  }
  type CurrencyRates {
    base: String!
    rates: [Rate!]
  }
  type Query {
    searchCountries(countryName: String!): [Country]
    currencyRates(currencySymbols: [String!]): CurrencyRates
  }
`;
