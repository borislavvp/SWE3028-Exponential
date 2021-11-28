import axios, { AxiosResponse } from "axios";
import { DateTime } from "luxon";
import { NotificationItem } from "../../../reducers/notifications/types/NotificationsState";
import { Alert } from "../types/Alert";

const base = "http://10.0.2.2:64439/alerts";

export const alertsCaller = axios.create({ baseURL: base });

interface AlertsDTO {
    stockName: string,
    stockSymbol: string,
    deviceId: string,
    alertValue: number,
    id: number,
}
interface NotificationsDTO {
    stockName: string,
    stockSymbol: string,
    notificationValue: number,
    notificationImageURL: string,
    dateTIme: string,
    id: number,
}

export const alertsAPI = {
  setAlert(alert: Alert): Promise<Alert> {
    return new Promise((resolve, reject) => {
      alertsCaller
          .post(`${base}/set`,alert
      )
        .then(() => resolve(alert))
        .catch((e) => {
          console.log(JSON.stringify(e));
          reject()
        });
    });
  },
  fetchAlerts(): Promise<AlertsDTO[]> {
    return new Promise((resolve, reject) => {
      alertsCaller
        .get(`${base}/all`)
          .then((res: AxiosResponse<AlertsDTO[]>) => resolve(res.data))
        .catch(() => reject());
    });
  },
  fetchAlertsNotifications(): Promise<NotificationItem[]> {
    return new Promise((resolve, reject) => {
      alertsCaller
        .get(`${base}/notifications`)
          .then((res: AxiosResponse<NotificationsDTO[]>) => {
              console.log(res.data)
              const data = res.data.map(n => ({
                  id: `${n.id}`,
                  imageUrl: n.notificationImageURL,
                  message: `${n.stockSymbol} is about to ${n.notificationValue < 0 ? 'plunge !' : 'surge !'}`,
                  stockSymbol: n.stockSymbol,
                  result: n.notificationValue < 0 ? 'plunge' : 'surge',
                  sentTime: DateTime.fromSQL(n.dateTIme),
                  seen:false,
                  value: n.notificationValue
                } as NotificationItem))
              resolve(data)
          })
        .catch(() => reject());
    });
  },
};
