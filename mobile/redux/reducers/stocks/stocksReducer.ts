import { ServerMessage } from "../../../socket/messages/server/ServerMessage";
import { STOCK_ITEM_CHANGE } from "../../../socket/messages/server/StockItemChangeMessage";
import { SUPPORTED_STOCKS } from "../../../socket/messages/server/SupportedStocksMessage";
import { SEARCH_STOCK } from "../../actions/stocks/types/SearchStock";
import { SearchStockActionTypes } from "../../actions/stocks/types/StocksActionTypes";
import { StocksState } from "./types/StocksState";

export function stocksReducer(state: StocksState = [],
                              action: ServerMessage | SearchStockActionTypes): StocksState {
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