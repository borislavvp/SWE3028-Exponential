import { NotificationItem } from "../../../reducers/notifications/types/NotificationsState";

export const SEE_NOTIFICATION = "SEE_NOTIFICATION";

export type SeeNotificaitonPayload = NotificationItem;

export interface SeeNotification{
    type: typeof SEE_NOTIFICATION,
    payload: SeeNotificaitonPayload
}