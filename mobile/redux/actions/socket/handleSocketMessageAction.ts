import { ServerMessage } from '../../../socket/messages/server/ServerMessage';
export const handleSocketMessageAction = (message:ServerMessage) => {
  return { type: message.type, payload: message.payload };
}
