export const errorCodeMap: Record<string, Record<string, string>> = {
  IMPLEMENTATION_ERROR: {
    errorCategory: "IMPLEMENTATION_ERROR",
    errorCode: "IMPL_ERROR",
  },
  COUNTRY_FETCH_ERROR: {
    errorCategory: "IMPLEMENTATION_ERROR",
    errorCode: "COUNTRY_FETCH_ERROR",
  },
  COUNTRY_NOT_FOUND_ERROR: {
    errorCategory: "NOT_FOUND",
    errorCode: "COUNTRY_NOT_FOUND_ERROR",
  },
  CURRENCY_FETCH_ERROR: {
    errorCategory: "IMPLEMENTATION_ERROR",
    errorCode: "CURRENCY_FETCH_ERROR",
  },
};
