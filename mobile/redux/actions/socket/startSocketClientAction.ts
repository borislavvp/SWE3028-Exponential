import { Dispatch } from 'react';
import { ServerMessage } from '../../../socket/messages/server/ServerMessage';
import { RootState, socket } from '../../store';
import { handleSocketMessageAction } from './handleSocketMessageAction';

export const startSocketClientAction = () => {
    return (dispatch:Dispatch<any>,getState:() => RootState) => {
        try {
            socket.connect("ws://localhost:3333",getState().auth.token)
            socket.on.handleSocketMessage = (message: ServerMessage) => dispatch(handleSocketMessageAction(message));
        } catch(e) {}   
    }
}
