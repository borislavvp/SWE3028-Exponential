import { ServerMessage } from "../messages/server/ServerMessage";

export interface SocketMessagesHandler{
   handleSocketMessage:(message: ServerMessage) => void,
}