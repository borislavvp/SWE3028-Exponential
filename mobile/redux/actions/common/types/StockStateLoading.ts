export const STOCK_STATE_LOADING = "STOCK_STATE_LOADING";

export interface StockStateLoading {
    type: typeof STOCK_STATE_LOADING,
    payload: boolean
}