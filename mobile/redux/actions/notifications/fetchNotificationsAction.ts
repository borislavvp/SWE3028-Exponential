import { ActionCreator, Dispatch } from 'redux';
import { alertsAPI } from '../alerts/api/alertsAPI';
import { setNotificationsLoadingStateAction } from '../common/setNotificationsLoadingStateAction';
import { FetchNotificationsPayload, FETCH_NOTIFICATIONS } from './types/FetchNotifications';
import { NewNotificationPayload, NEW_NOTIFICATION } from './types/NewNotification';
import { NotificationActionTypes } from './types/NotificationActionTypes';

const fetchNotificationActionResult: ActionCreator<NotificationActionTypes> = (notification: FetchNotificationsPayload) => {
  return { type: FETCH_NOTIFICATIONS, payload: notification };
}

export const fetchNotificationsAction = () => {
    return (dispatch: Dispatch<any>) => {
        dispatch(fetchNotificationActionResult([]))
        dispatch(setNotificationsLoadingStateAction(true));
        return alertsAPI.fetchAlertsNotifications()
              .then(res => dispatch(fetchNotificationActionResult(res)))
                .catch(() => { })
            .catch(() => { })
            .finally(() => dispatch(setNotificationsLoadingStateAction(false)))
    }
}