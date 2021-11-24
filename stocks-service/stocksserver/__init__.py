import asyncio
import websockets
import logging
from stocksserver.messages import get_stock_item_change_message,get_supported_stocks_info_message,handle_client_message

from exponent_server_sdk import (
    DeviceNotRegisteredError,
    PushClient,
    PushMessage,
    PushServerError,
    PushTicketError,
)
from requests.exceptions import ConnectionError, HTTPError


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


# Basic arguments. You should extend this function with the push features you
# want to use, or simply pass in a `PushMessage` object.
def send_push_message(token, message, extra=None):
    try:
        print("AEE")
        response = PushClient().publish(
            PushMessage(to=token,
                        body=message,
                        data=extra))
                        
        print("AEEWEEE")
    except PushServerError as exc:
        # Encountered some likely formatting/validation error.
        print("Err")
    except (ConnectionError, HTTPError) as exc:
        # Encountered some Connection or HTTP error - retry a few times in
        # case it is transient.
        print("Err1")
    except Exception as e:
        print(str(e))

    try:
        # We got a response back, but we don't know whether it's an error yet.
        # This call raises errors so we can handle them with normal exception
        # flows.
        response.validate_response()
    except DeviceNotRegisteredError:
        # Mark the push token as inactive
        # from notifications.models import PushToken
        # PushToken.objects.filter(token=token).update(active=False)
        print("Err2")
    except PushTicketError as exc:
        # Encountered some other per-notification error.
        print("Err3")
    except Exception as e:
        print(str(e))