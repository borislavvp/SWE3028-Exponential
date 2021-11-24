import { ActionCreator, Dispatch } from 'redux';
import { FetchNotificationsPayload, FETCH_NOTIFICATIONS } from './types/FetchNotifications';
import { NewNotificationPayload, NEW_NOTIFICATION } from './types/NewNotification';
import { NotificationActionTypes } from './types/NotificationActionTypes';

const fetchNotificationActionResult: ActionCreator<NotificationActionTypes> = (notification: FetchNotificationsPayload) => {
  return { type: FETCH_NOTIFICATIONS, payload: notification };
}

export const fetchNotificationsAction = () => {
    return (dispatch: Dispatch<any>) => {
        dispatch(fetchNotificationActionResult([]))
        // dispatch(setAuthLoadingStateAction(true));
        // return authAPI.registerUser(registerUserModel)
        //       .then(res => {
        //           storeAuthToLocalStorage(res)
        //             .then(() => {
        //               const data = { ...res, logged: true };
        //               dispatch(authRegisterUserResult(data));
        //               dispatch(tokenMonitorAction());
        //               // dispatch(startSocketClientAction());
        //             })
        //           .catch(() => { })
        //         .finally(() => dispatch(setAuthLoadingStateAction(false)))
        //       })
        //     .catch(() => { })
        //     .finally(() => dispatch(setAuthLoadingStateAction(false)))
    }
}