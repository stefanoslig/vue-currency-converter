import { RatesEnum } from "./RatesEnum";

export interface ExchangeRates {
  rates: ExchangeRate;
  base: RatesEnum;
  date: string;
}

export type ExchangeRate = { [key in keyof typeof RatesEnum]: number };
