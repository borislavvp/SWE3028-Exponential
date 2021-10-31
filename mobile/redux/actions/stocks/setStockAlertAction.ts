import { SetAlertMessage, SET_ALERT } from '../../../socket/messages/client/SetAlertMessage'
import { socket } from '../../store'

export const setStockAlertAction = (alertValue:number,stockId:string) => {
    socket.send({ type: SET_ALERT, payload: { alert: alertValue, id: stockId } } as SetAlertMessage)
}
