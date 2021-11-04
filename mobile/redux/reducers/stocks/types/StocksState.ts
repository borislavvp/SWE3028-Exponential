export type StocksState = StockItemState[];
export interface StockItemState {
    id: string;
    exchange:string,
    name:string,
    currency:string,
    quoteType:string,
    price: string,
    timestamp: number | null,
    changePercent: string ,
    change: string,
    logo?:string
}