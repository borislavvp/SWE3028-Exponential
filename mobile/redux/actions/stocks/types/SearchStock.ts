import { AuthState } from "../../../reducers/auth/types/AuthState";


export const SEARCH_STOCK = "SEARCH_STOCK";

export interface StockSearchResult {
    ticker: string,
    name: string,
    logo: string
}


export interface SearchStock{
    type: typeof SEARCH_STOCK,
    payload: StockSearchResult[]
}