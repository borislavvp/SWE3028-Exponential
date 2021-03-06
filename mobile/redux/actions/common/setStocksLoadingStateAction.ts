import { ActionCreator } from "redux";
import { CommonActions } from "./types/CommonActions";
import { STOCK_STATE_LOADING } from "./types/StockStateLoading";

export const setStocksLoadingStateAction: ActionCreator<CommonActions> = (loading: boolean) => {
    console.log(loading);
    return { type: STOCK_STATE_LOADING, payload: loading };
}