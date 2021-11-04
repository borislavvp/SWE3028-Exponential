import axios, { AxiosResponse } from 'axios';
import { DateTime, Duration } from 'luxon';
import { AuthState } from '../../../reducers/auth/types/AuthState';
import { StockSearchResult } from '../types/SearchStock';

const base = "https://api.polygon.io/v3/reference";

const stockLogo = (stockSymbol:string) => `https://s3.polygon.io/logos/${stockSymbol.toLocaleLowerCase()}/logo.png`;

const caller = axios.create({ baseURL: base })

export const stocksAPI = {
  searchStock(stockName:string): Promise<StockSearchResult[]> {
    return new Promise((resolve,reject) => {
        caller
            .get(`${base}/tickers?search=${stockName}&active=true&sort=ticker&order=asc&limit=10&apiKey=9XKAPSk7sd5zA_ebxUzgHixBQU5BmDAJ` )
            .then((res: AxiosResponse<{ results: { ticker: string, name: string }[]}>) => {
                const data = [
                    ...res.data.results.map(s => ({
                        ticker: s.ticker,
                        name: s.name,
                        logo: stockLogo(s.ticker)
                    } as StockSearchResult))
                ]
                resolve(data);
            })
            .catch(() => reject());
    });
  },
};