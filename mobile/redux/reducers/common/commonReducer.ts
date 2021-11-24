import { AUTH_STATE_LOADING } from "../../actions/common/types/AuthStateLoading";
import { CommonActions } from "../../actions/common/types/CommonActions";
import { STOCK_STATE_LOADING } from "../../actions/common/types/StockStateLoading";
import { CommonState } from "./types/CommonState";

export const commonReducer = (state: CommonState = {authStateLoading:false,stocksStateLoading:false},action:CommonActions) => {
    switch (action.type) {
        case AUTH_STATE_LOADING:
            return {...state,authStateLoading:action.payload};
        case STOCK_STATE_LOADING:
            return {...state,stocksStateLoading:action.payload};
        default:
            return state;
    }
}