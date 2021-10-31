export type StocksState = StockItemState[];
export interface StockItemState {
    id: string;
    exchange:string,
    name:string,
    currency:string,
    quoteType:string,
    price: string,
    timestamp: number | null,
    changePercent: number | null,
    change: number | null,
}