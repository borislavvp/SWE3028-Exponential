import { ActionCreator } from 'redux';
import { NewNotificationPayload, NEW_NOTIFICATION } from './types/NewNotification';
import { NotificationActionTypes } from './types/NotificationActionTypes';

export const handleNewNotificationAction: ActionCreator<NotificationActionTypes> = (notification: NewNotificationPayload) => {
    return { type: NEW_NOTIFICATION, payload: notification };
}
