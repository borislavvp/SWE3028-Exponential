import { ActionCreator } from 'redux';
import { NewNotificationPayload } from './types/NewNotification';
import { NotificationActionTypes } from './types/NotificationActionTypes';
import { RESET_NOTIFICATIONS_COUNTER } from './types/ResetNotificationsCounter';

export const resetNotificationsCounterAction: ActionCreator<NotificationActionTypes> = () => {
    return { type: RESET_NOTIFICATIONS_COUNTER };
}
