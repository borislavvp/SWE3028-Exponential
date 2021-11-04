from yliveticker import YLiveTicker
from stocksserver import SocketServer
from stocksserver.messages import SUPPORTED_STOCKS

import asyncio
import threading

def start_loop(loop, server):
    loop.run_until_complete(server)
    loop.run_forever()

def printRes(ws, res):
    socket.broadcast(res)
    # print(res)


def on_close(ws,res):
    print("bye")

try:

    socket = SocketServer(port=3333)

    loop = asyncio.new_event_loop()

    thread = threading.Thread(target=start_loop, args=(loop, socket.run(loop)))
    thread.start()

    loop.create_task(YLiveTicker(
        on_ticker=printRes,
        on_close=on_close,
        ticker_names=SUPPORTED_STOCKS,
    ))

except (Exception, KeyboardInterrupt) as e:
    print('ERROR', str(e))
    loop.stop()
    exit()
