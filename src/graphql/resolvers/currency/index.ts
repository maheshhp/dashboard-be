import { CurrencyRatesRes } from "../../../services/api/api.types";
import { getCurrencyRates } from "../../../services/api";

export const currencyRatesResolver = async (
  parent: any,
  args: Record<any, any>
): Promise<CurrencyRatesRes> => {
  const { currencySymbols } = args;
  return getCurrencyRates(currencySymbols);
};
