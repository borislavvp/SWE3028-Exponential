import { AUTH_STATE_LOADING } from "../../actions/common/types/AuthStateLoading";
import { CommonActions } from "../../actions/common/types/CommonActions";
import { STOCK_STATE_LOADING } from "../../actions/common/types/StockStateLoading";
import { CommonState } from "./types/CommonState";

export const commonReducer = (state: CommonState = {authStateLoading:false,stocksStateLoading:false},action:CommonActions) => {
    switch (action.type) {
        case AUTH_STATE_LOADING:
            state.authStateLoading = action.payload;
            return state;
        case STOCK_STATE_LOADING:
            state.stocksStateLoading = action.payload;
            return state;
        default:
            return state;
    }
}