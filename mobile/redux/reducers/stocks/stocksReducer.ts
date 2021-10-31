import { ServerMessage } from "../../../socket/messages/server/ServerMessage";
import { STOCK_ITEM_CHANGE } from "../../../socket/messages/server/StockItemChangeMessage";
import { SUPPORTED_STOCKS } from "../../../socket/messages/server/SupportedStocksMessage";
import { StocksState } from "./types/StocksState";

export function stocksReducer(state: StocksState = [], action: ServerMessage): StocksState {
  switch (action.type) {
    case STOCK_ITEM_CHANGE: {
      const itemIndex = state.findIndex(s => s.id === action.payload.id);
      if (itemIndex !== -1) {
        state[itemIndex] = { ...state[itemIndex], ...action.payload, price:action.payload.price.toFixed(2) };
      }
      return [...state];
    }
    case SUPPORTED_STOCKS: {
      state = (action.payload) as StocksState;
      return state;
    }
    default:
      return state
  }
};