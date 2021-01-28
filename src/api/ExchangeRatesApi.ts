import axios from "axios";
import { ExchangeRates } from "../models/ExchangeRates";
import { RatesEnum } from "../models/RatesEnum";
import { HistoryRates } from "../models/HistoryRates";
import { formatDate } from "./utils";

const BASE_URL = "https://api.exchangeratesapi.io";
const end_at = formatDate(new Date());
const start_at = formatDate(
  new Date(new Date().setMonth(new Date().getMonth() - 1))
);

/**
 * Get the exchange rates data for a specific currency
 * @param {RatesEnum} base
 */
export const getExchangeRates = async (
  base?: RatesEnum
): Promise<ExchangeRates> => {
  const response = await axios.get<ExchangeRates>(
    `${BASE_URL}/latest`,
    base ? { params: { base } } : {}
  );
  return response.data;
};

/**
 * Get the history exchange rates data for a specific currency
 * For the moment the end_at and start_at parameters are constants
 * @param {RatesEnum[]} symbols
 * @param {RatesEnum} base
 */
export const getHistoryRates = async (
  symbols: RatesEnum[],
  base: RatesEnum
): Promise<HistoryRates> => {
  const response = await axios.get<HistoryRates>(`${BASE_URL}/history`, {
    params: { base, start_at, end_at, symbols: symbols.join(",") },
  });
  return response.data;
};
