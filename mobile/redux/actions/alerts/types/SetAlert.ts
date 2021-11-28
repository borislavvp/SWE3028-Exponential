import { Alert } from "./Alert";

export const SET_ALERT = "SET_ALERT";

export interface SetAlert{
    type: typeof SET_ALERT,
    payload: Alert
}