STOCK_ITEM_CHANGE = "STOCK_ITEM_CHANGE"

class StockItemChangePayload:
    def __init__(self, id,price,timestamp,changePercent,change):
        self.id, self.price, self.timestamp,self.changePercent, self.change = id,price,timestamp,changePercent,change
    
class StockItemChangeMessage:
    def __init__(self, payload):
        self.type, self.payload = STOCK_ITEM_CHANGE, payload

