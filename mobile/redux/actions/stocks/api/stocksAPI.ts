import axios, { AxiosResponse } from "axios";
import { StockSearchResult } from "../types/SearchStock";

const base = "https://api.polygon.io/v3/reference";
const API_KEY = "API_KEY";

export const stockLogo = (stockSymbol: string) => `https://s3.polygon.io/logos/${stockSymbol.toLocaleLowerCase()}/logo.png`;

const caller = axios.create({ baseURL: base });

export const stocksAPI = {
  searchStock(stockName: string): Promise<StockSearchResult[]> {
    return new Promise((resolve, reject) => {
      caller
        .get(`${base}/tickers?search=${stockName}&active=true&sort=ticker&order=asc&limit=10&apiKey=${API_KEY}`)
        .then((res: AxiosResponse<{ results: { ticker: string; name: string }[] }>) => {
          const data = [
            ...res.data.results.map(
              (s) =>
                ({
                  ticker: s.ticker,
                  name: s.name,
                  logo: stockLogo(s.ticker),
                } as StockSearchResult)
            ),
          ];
          resolve(data);
        })
        .catch((e) => {
          
          console.log(e);
          reject()
        });
    });
  },
  stockHistoricalData(stockName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      caller
        .get(`http://api.marketstack.com/v1/tickers/${stockName}/eod?access_key=${API_KEY}&limit=10`)
        .then((res: AxiosResponse<{ data: { eod: [] } }>) => {
          resolve(res.data.data.eod);
        })
        .catch(() => reject());
    });
  },
};
