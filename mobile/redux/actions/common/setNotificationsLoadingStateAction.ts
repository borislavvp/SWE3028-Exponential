import { ActionCreator } from "redux";
import { CommonActions } from "./types/CommonActions";
import { NOTIFICATIONS_STATE_LOADING } from "./types/NotificationsStateLoading";

export const setNotificationsLoadingStateAction : ActionCreator<CommonActions> = (loading: boolean) => {
    return { type: NOTIFICATIONS_STATE_LOADING, payload: loading };
}