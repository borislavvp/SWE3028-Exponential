SUPPORTED_STOCKS_MESSAGE = "SUPPORTED_STOCKS"

class StockItem:
    def __init__(self, symbol,shortName,exchange,currency,quoteType,regularMarketPrice):
        self.id, self.name, self.exchange, self.currency,self.quoteType, self.price = symbol,shortName,exchange,currency,quoteType,regularMarketPrice
    
class SupportedStocksMessage:
    def __init__(self, payload):
        self.type, self.payload = SUPPORTED_STOCKS_MESSAGE, payload

