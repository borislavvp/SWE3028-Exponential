import { Alert } from "./Alert";

export const FETCH_ALERTS = "FETCH_ALERTS";

export interface FetchAlerts{
    type: typeof FETCH_ALERTS,
    payload: Alert[]
}