import { FETCH_NOTIFICATIONS } from "../../actions/notifications/types/FetchNotifications";
import { NEW_NOTIFICATION } from "../../actions/notifications/types/NewNotification";
import { NotificationActionTypes } from "../../actions/notifications/types/NotificationActionTypes";
import { RESET_NOTIFICATIONS_COUNTER } from "../../actions/notifications/types/ResetNotificationsCounter";
import { NotificationsState } from "./types/NotificationsState";

export function notificationsReducer(state: NotificationsState = {
    notSeenNotifications: 0,
    notifications:[]
},action:NotificationActionTypes): NotificationsState {
  switch (action.type) {
      case NEW_NOTIFICATION: {
          return {
            notSeenNotifications: state.notSeenNotifications + 1,
            notifications: [
                ...state.notifications,
                {
                    id: action.payload.messageId,
                    imageUrl: action.payload.notification.android.imageUrl,
                    message: action.payload.notification.body,
                    sentTime: action.payload.sentTime,
                    ttl:action.payload.ttl
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