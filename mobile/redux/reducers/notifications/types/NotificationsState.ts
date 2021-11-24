export type NotificationsState = {
    notSeenNotifications: number,
    notifications:NotificationItem[]
}

export interface NotificationItem{
    id:string,
    message: string,
    imageUrl: string,
    sentTime: number,
    ttl:number
}