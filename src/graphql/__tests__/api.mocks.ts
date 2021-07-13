export const countrySearchMockRes = [
  {
    name: "Test Country",
    alpha3Code: "TCY",
    population: 3000,
    currencies: [
      {
        name: "Test Money",
        symbol: "$",
        code: "TMY",
      },
    ],
  },
];

export const currencySearchMockRes = {
  success: true,
  base: "EUR",
  rates: {
    TMY: 1.18581,
  },
};
