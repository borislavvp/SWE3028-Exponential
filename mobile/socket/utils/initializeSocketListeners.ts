import { SocketMessagesHandler } from "../types/SocketMessagesHandler"

export const initializeSocketListeners = (
    stockMessageHandler?: () => void): SocketMessagesHandler => {
    return {
        handleSocketMessage: stockMessageHandler!,
    }
}