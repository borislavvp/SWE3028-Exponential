import yfinance as yf
import json
from collections import namedtuple
from stocksserver.messages.server.StockItemChangeMessage import StockItemChangeMessage,StockItemChangePayload
from stocksserver.messages.server.SupportedStocksMessage import SupportedStocksMessage,StockItem
# dumps() produces JSON in native str format. if you want to writ it in file use dump()
# studentJson = json.dumps(student, indent=4, cls=SetAlertMessageEncoder)

# Parse JSON into an object with attributes corresponding to dict keys.
# studObj = json.loads(studentJson, object_hook=customStudentDecoder)
class MessageEncoder(json.JSONEncoder):
        def default(self, o):
            return o.__dict__

def messageDecoder(messageDict):
    return namedtuple('X', messageDict.keys())(*messageDict.values())


SUPPORTED_STOCKS = [
    "^GSPC",
    "BTC-USD",
]

def get_stock_item_change_message(message):
    payload = StockItemChangePayload(message['id'],message['price'],message['timestamp'],message['changePercent'],message['change'])
    return json.dumps(StockItemChangeMessage(payload), indent=4,cls=MessageEncoder) 

def get_supported_stocks_info_message():
    supported_stocks = yf.Tickers(' '.join(SUPPORTED_STOCKS))

    tickers = []
    for ticker in SUPPORTED_STOCKS:
        ticker_info = supported_stocks.tickers[ticker].info;
        tickers.append(StockItem(ticker_info['symbol'],ticker_info['shortName'],ticker_info['exchange'],ticker_info['currency'],ticker_info['quoteType'],ticker_info['regularMarketPrice']))
    
    return json.dumps(SupportedStocksMessage(tickers), indent=4,cls=MessageEncoder) 

def get_stock_historical_data_message(stock):
    
        data = yf.download(  # or pdr.get_data_yahoo(...
            # tickers list or string as well
            tickers = stock,

            # use "period" instead of start/end
            # valid periods: 1d,5d,1mo,3mo,6mo,1y,2y,5y,10y,ytd,max
            # (optional, default is '1mo')
            period = "3mo",

            # fetch data by interval (including intraday if period < 60 days)
            # valid intervals: 1m,2m,5m,15m,30m,60m,90m,1h,1d,5d,1wk,1mo,3mo
            # (optional, default is '1d')
            interval = "1d",

            # group by ticker (to access via data['SPY'])
            # (optional, default is 'column')
            group_by = 'ticker',

            # adjust all OHLC automatically
            # (optional, default is False)
            auto_adjust = True,

            # download pre/post regular market hours data
            # (optional, default is False)
            prepost = True,

            # use threads for mass downloading? (True/False/Integer)
            # (optional, default is True)
            threads = True,

            # proxy URL scheme use use when downloading?
            # (optional, default is None)
            proxy = None
        )
        return json.dumps(json.loads(data.to_json(orient="table")), indent=4)


def handle_client_message(websockets,clients,message,logging):
    data = json.loads(message)
    if data["type"] == "SET_ALERT_MESSAGE":
        websockets.broadcast(clients, "AEAEA")
    if data["type"] == "SET_ALERT_MESSAGE":
        websockets.broadcast(clients, "AEAEA")
    else:
        logging.error("unsupported event: %s", data)