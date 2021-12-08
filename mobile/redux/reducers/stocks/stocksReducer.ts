import { SEARCH_STOCK } from "../../actions/stocks/types/SearchStock";
import { SearchStockActionTypes } from "../../actions/stocks/types/StocksActionTypes";
import { StocksState } from "./types/StocksState";

export function stocksReducer(state: StocksState = [],
                              action: SearchStockActionTypes): StocksState {
  switch (action.type) {
    case SEARCH_STOCK: {
      return [
        ...action.payload
      ];
    }
    default:
      return state
  }
};