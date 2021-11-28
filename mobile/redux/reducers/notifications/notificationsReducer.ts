import { DateTime } from "luxon";
import { FETCH_NOTIFICATIONS } from "../../actions/notifications/types/FetchNotifications";
import { NEW_NOTIFICATION } from "../../actions/notifications/types/NewNotification";
import { NotificationActionTypes } from "../../actions/notifications/types/NotificationActionTypes";
import { RESET_NOTIFICATIONS_COUNTER } from "../../actions/notifications/types/ResetNotificationsCounter";
import { SEE_NOTIFICATION } from "../../actions/notifications/types/SeeNotification";
import { NotificationsState } from "./types/NotificationsState";

export function notificationsReducer(state: NotificationsState = {
    notSeenNotifications: 0,
    notifications:[]
},action:NotificationActionTypes): NotificationsState {
  switch (action.type) {
      case NEW_NOTIFICATION: {
          console.log(action.payload)
          return {
            notSeenNotifications: state.notSeenNotifications + 1,
            notifications: [
                ...state.notifications,
                {
                    id: action.payload.messageId,
                    imageUrl: action.payload.notification.android.imageUrl,
                    message: action.payload.notification.body,
                    stockSymbol: action.payload.data.stockSymbol,
                    result: action.payload.data.value < 0 ? 'plunge' : 'surge',
                    sentTime: DateTime.fromSeconds(action.payload.sentTime),
                    value: action.payload.data.value,
                    seen:false
                }
            ] 
        };
      }
    case RESET_NOTIFICATIONS_COUNTER: {
        return {
            ...state,
            notSeenNotifications:0
        };
    }
      case SEE_NOTIFICATION: {
        return {
            ...state,
            notifications: state.notifications.map(n => {
                if (n.id === action.payload.id) {
                    return {
                        ...n,
                        seen: true
                    }
                } else {
                    return n;
                }
            })
        };
    }
    case FETCH_NOTIFICATIONS: {
        return {
            notSeenNotifications: 0,
            notifications: [...action.payload]
        };
    }
    default:
      return state
  }
};