import { getCurrencyRates, CurrencyRatesRes } from "../../../services/api";

export const currencyRatesResolver = async (
  parent: any,
  args: Record<any, any>
): Promise<CurrencyRatesRes> => {
  const { currencySymbols } = args;
  return getCurrencyRates(currencySymbols);
};
