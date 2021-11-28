import axios from "axios";
import { ActionCreator, Dispatch } from "redux";
import { StocksState } from "../../reducers/stocks/types/StocksState";
import { setStocksLoadingStateAction } from "../common/setStocksLoadingStateAction";
import debounce from "../utils/debounce";
import { stocksAPI } from "./api/stocksAPI";
import { SEARCH_STOCK, StockSearchResult } from "./types/SearchStock";
import { SearchStockActionTypes } from "./types/StocksActionTypes";

const api = "http://api.marketstack.com/v1/tickers?access_key=9bacfc39ef546124eecfd360c6aa8dc9&search=A";
const api2 = "https://api.polygon.io/v3/reference/tickers?search=A&active=true&sort=ticker&order=asc&limit=10&apiKey=9XKAPSk7sd5zA_ebxUzgHixBQU5BmDAJ";

const logos = "https://s3.polygon.io/logos/amrs/logo.png";

const searchStockActionResult: ActionCreator<SearchStockActionTypes> = (stocksState: StockSearchResult[]) => {
    return { type: SEARCH_STOCK, payload: stocksState };
}

export const searchStockAction = (stockName:string) => {
    return (dispatch: Dispatch<any>) => {
        if (stockName !== "") {
            search(stockName, dispatch)
        } else {
            dispatch(searchStockActionResult([]));
        }
    };
}

const search = debounce((stockName: string, dispatch: Dispatch<any>) => {
    dispatch(setStocksLoadingStateAction(true));
    stocksAPI.searchStock(stockName)
        .then(data =>  dispatch(searchStockActionResult(data)))
        .catch(() =>  dispatch(setStocksLoadingStateAction(false)))
    .finally(() => dispatch(setStocksLoadingStateAction(false)));
}, 300, false)