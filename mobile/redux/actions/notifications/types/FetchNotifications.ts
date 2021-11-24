import { NotificationItem } from "../../../reducers/notifications/types/NotificationsState";

export const FETCH_NOTIFICATIONS = "FETCH_NOTIFICATIONS";

export type FetchNotificationsPayload = NotificationItem[]

export interface FetchNotifications{
    type: typeof FETCH_NOTIFICATIONS,
    payload: FetchNotificationsPayload
}