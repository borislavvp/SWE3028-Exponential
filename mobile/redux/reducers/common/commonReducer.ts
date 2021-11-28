import { ALERTS_STATE_LOADING } from "../../actions/common/types/AlertsStateLoading";
import { AUTH_STATE_LOADING } from "../../actions/common/types/AuthStateLoading";
import { CommonActions } from "../../actions/common/types/CommonActions";
import { NOTIFICATIONS_STATE_LOADING } from "../../actions/common/types/NotificationsStateLoading";
import { STOCK_STATE_LOADING } from "../../actions/common/types/StockStateLoading";
import { CommonState } from "./types/CommonState";

export const commonReducer = (state: CommonState = {authStateLoading:false,stocksStateLoading:false,alertStateLoading:false,notificationsStateLoading:false},action:CommonActions) => {
    switch (action.type) {
        case AUTH_STATE_LOADING:
            return {...state,authStateLoading:action.payload};
        case STOCK_STATE_LOADING:
            return {...state,stocksStateLoading:action.payload};
        case ALERTS_STATE_LOADING:
            return {...state,alertStateLoading:action.payload};
        case NOTIFICATIONS_STATE_LOADING:
            return {...state,notificationsStateLoading:action.payload};
        default:
            return state;
    }
}