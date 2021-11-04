import { ActionCreator } from "redux";
import { AUTH_STATE_LOADING } from "./types/AuthStateLoading";
import { CommonActions } from "./types/CommonActions";

export const setAuthLoadingStateAction : ActionCreator<CommonActions> = (loading: boolean) => {
    return { type: AUTH_STATE_LOADING, payload: loading };
}