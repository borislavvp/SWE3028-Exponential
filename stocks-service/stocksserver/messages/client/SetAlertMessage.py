SET_ALERT_MESSAGE = "SET_ALERT_MESSAGE"

class SetAlertMessage:
    def __init__(self, type, payload):
        self.type, self.payload = type, payload

class SetAlertMessagePayload:
    def __init__(self, ticker, alert_value):
        self.ticker, self.alert_value = ticker, alert_value

