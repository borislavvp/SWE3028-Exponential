import { ClientMessage } from './messages/client/ClientMessage';
import { SocketMessagesHandler } from './types/SocketMessagesHandler'
import { initializeSocketListeners } from './utils/initializeSocketListeners';

export interface ISocketService {
    socket: WebSocket,
    connect: (url: string, token: string ) => void,
    disconnect: () => void,
    reconnect: (url: string, token: string ) => void,
    on:SocketMessagesHandler
}
export class SocketService implements ISocketService {
    public socket = {} as WebSocket;
    
    public on : SocketMessagesHandler = initializeSocketListeners();

    public disconnect = () => {
        this.on = initializeSocketListeners();
        this.socket && this.socket.close();
    }
    
    public connect = (url: string, token: string) => {
        if(this.socket.readyState && this.socket.readyState === this.socket.OPEN ){
            return;
        }
        this.socket = new WebSocket(`${url}/authorization?token=${token}`);
        this.socket.onmessage = (ev: MessageEvent) => {
            this.on.handleSocketMessage(JSON.parse(ev.data))
        }
        this.socket.onopen = (ev) => {
            console.log(`App socket open at ${url}`);
        };
        this.socket.onerror = (e) => {
            console.error("Socket encountered error: Closing socket");
            this.socket.close();
        };
        this.socket.onclose = (ev: CloseEvent) => {
            console.log(
            "Socket is closed. Reconnect will be attempted in 2 seconds.",
            ev
            );
            this.reconnect(url, token);
        };
    }
    public reconnect = (url: string, token: string) => {
        setTimeout(() => {
            if (
            !(this.socket.readyState === this.socket.OPEN) &&
            !(this.socket.readyState === this.socket.CONNECTING)
            ) {
                this.connect(url, token);
            }
        }, 2000);
    }
    public send = (message: ClientMessage) => {
        if (this.socket.readyState === this.socket.OPEN) {
            this.socket.send(JSON.stringify(message))
        }
    }
};
