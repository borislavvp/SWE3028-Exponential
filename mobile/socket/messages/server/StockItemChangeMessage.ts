export const STOCK_ITEM_CHANGE = "STOCK_ITEM_CHANGE";

export interface StockItemChangePayload {
  id: string;
  price: number,
  timestamp: number,
  changePercent: number,
  change: number,
}

export interface StockItemChangeMessage {
  type:typeof STOCK_ITEM_CHANGE;
  payload: StockItemChangePayload;
}
