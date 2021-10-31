import asyncio
import websockets
import logging
from stocksserver.messages import get_stock_item_change_message,get_supported_stocks_info_message,handle_client_message

class SocketServer():
    clients = set()

    def __init__(self, port):
        self.port = port

    def register(self,websocket):
        self.clients.add(websocket)

    def broadcast(self,message):
        websockets.broadcast(self.clients,get_stock_item_change_message(message))
        
    async def consumer_handler(self,websocket, path):
        async for message in websocket:
           handle_client_message(websockets,self.clients,message,logging)

    async def handler(self,websocket, path):
        try:
             print(path)
             self.clients.add(websocket) 
             await websocket.send(get_supported_stocks_info_message())
             
             consumer_task = asyncio.ensure_future(
                self.consumer_handler(websocket, path))

             pending = await asyncio.wait(
                [consumer_task],
                return_when=asyncio.FIRST_COMPLETED,
             )
             print(pending)
        except:
             print("Somethings went wrong when writing to the file")
        finally:
            self.clients.remove(websocket)

    async def run(self,loop):
        print("Stocks service listening at port: ",self.port)
        async with websockets.serve(self.handler, "localhost", self.port,loop=loop):
            await asyncio.Future()
            
              # run forever
