import { ExchangeRate } from "./ExchangeRates";

export interface HistoryRates {
  rates: {
    [key: string]: ExchangeRate;
  };
}
