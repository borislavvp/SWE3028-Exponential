export type StocksState = StockSearchItem[]

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

export interface StockItem{
    ticker: string,
    name: string,
    logo: string
    price: number,
}

export interface StockSearchItem{
    ticker: string,
    name: string,
    logo: string
}