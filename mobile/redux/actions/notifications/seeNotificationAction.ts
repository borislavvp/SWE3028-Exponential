import { ActionCreator } from 'redux';
import { NotificationItem } from '../../reducers/notifications/types/NotificationsState';
import { NewNotificationPayload, NEW_NOTIFICATION } from './types/NewNotification';
import { NotificationActionTypes } from './types/NotificationActionTypes';
import { SEE_NOTIFICATION } from './types/SeeNotification';

export const seeNotificationAction: ActionCreator<NotificationActionTypes> = (notification:NotificationItem) => {
    return { type: SEE_NOTIFICATION, payload: notification };
}
