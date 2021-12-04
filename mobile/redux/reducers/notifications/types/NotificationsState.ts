import { DateTime } from "luxon";

export type NotificationsState = {
    notSeenNotifications: number,
    notifications:NotificationItem[]
}

export interface NotificationItem{
    id:string,
    message: string,
    stockSymbol: string,
    value: string,
    result: string,
    imageUrl: string,
    sentTime: DateTime,
    seen:boolean
}