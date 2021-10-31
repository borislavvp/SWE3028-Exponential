from yliveticker import YLiveTicker
from stocksserver import SocketServer, stocks

import asyncio
import threading

socket = SocketServer(port=3333)

def start_loop(loop, server):
    loop.run_until_complete(server)
    loop.run_forever()

def printRes(ws, res):
    socket.broadcast(res)
    # print(res)


def on_close(ws):
    print("bye")


loop = asyncio.new_event_loop()

thread = threading.Thread(target=start_loop, args=(loop, socket.run(loop)))
thread.start()

loop.create_task(YLiveTicker(
    on_ticker=printRes,
    on_close=on_close,
    ticker_names=stocks.SUPPORTED_STOCKS,
))
