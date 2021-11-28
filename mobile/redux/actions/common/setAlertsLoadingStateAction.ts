import { ActionCreator } from "redux";
import { ALERTS_STATE_LOADING } from "./types/AlertsStateLoading";
import { CommonActions } from "./types/CommonActions";

export const setAlertsLoadingStateAction : ActionCreator<CommonActions> = (loading: boolean) => {
    return { type: ALERTS_STATE_LOADING, payload: loading };
}