import { AlertActionTypes } from "../../actions/alerts/types/AlertsActionTypes";
import { FETCH_ALERTS } from "../../actions/alerts/types/FetchAlerts";
import { SET_ALERT } from "../../actions/alerts/types/SetAlert";
import { AlertsState } from "./types/AlertsState";

export function alertsReducer(state: AlertsState = [],action:AlertActionTypes): AlertsState {
  switch (action.type) {
      case SET_ALERT: {
          return [
              ...state,
              action.payload
          ];
      }
      case FETCH_ALERTS: {
          return [
            ...action.payload
          ];
    }
    default:
      return state
  }
};