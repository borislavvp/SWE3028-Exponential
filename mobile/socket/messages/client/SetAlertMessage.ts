export const SET_ALERT = "SET_ALERT";

export interface SetAlertMessagePayload {
    id: string;
    alert:number,
}

export interface SetAlertMessage {
  type : typeof SET_ALERT;
  payload: SetAlertMessagePayload;
}
