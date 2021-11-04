import { ServerMessage } from "../../../socket/messages/server/ServerMessage";
import { STOCK_ITEM_CHANGE } from "../../../socket/messages/server/StockItemChangeMessage";
import { SUPPORTED_STOCKS } from "../../../socket/messages/server/SupportedStocksMessage";
import { SEARCH_STOCK } from "../../actions/stocks/types/SearchStock";
import { SearchStockActionTypes } from "../../actions/stocks/types/StocksActionTypes";
import { StocksState } from "./types/StocksState";

export function stocksReducer(state: StocksState = [], action: ServerMessage | SearchStockActionTypes): StocksState {
  switch (action.type) {
    case STOCK_ITEM_CHANGE: {
      const itemIndex = state.findIndex(s => s.id === action.payload.id);
      if (itemIndex !== -1) {
        state[itemIndex] = {
          ...state[itemIndex],
          ...action.payload,
          price: action.payload.price.toFixed(2),
          change: action.payload.change.toFixed(5),
          changePercent: action.payload.changePercent.toFixed(5)
        };
      }
      return [...state];
    }
    case SUPPORTED_STOCKS: {
      state = (action.payload) as StocksState;
      return state;
    }
    case SEARCH_STOCK: {
      return [...state.map(s => ({...s, logo:action.payload[0].logo}))]
    }
    default:
      return state
  }
};