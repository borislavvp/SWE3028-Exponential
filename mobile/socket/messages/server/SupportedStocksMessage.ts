export const SUPPORTED_STOCKS = 'SUPPORTED_STOCKS'

export interface SupportedStocksMessagePayload {
    id: string;
    exchange:string,
    name:string,
    currency:string,
    quoteType:string,
    price: string,
}

export interface SupportedStocksMessage {
  type: typeof SUPPORTED_STOCKS,
  payload: SupportedStocksMessagePayload[]
}
