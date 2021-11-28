export const NEW_NOTIFICATION = "NEW_NOTIFICATION";

export interface NewNotificationPayload
{
    // "data": { },
    messageId: string,
    data:{
        stockSymbol: string,
        value: number
    },
    notification: {
        android: {
            imageUrl: string,
        },
        body: string,
        title:string
    },
    sentTime: number,
    ttl: number
}

export interface NewNotification{
    type: typeof NEW_NOTIFICATION,
    payload: NewNotificationPayload
}