import { combineReducers } from 'redux';
import { authReducer } from './auth/authReducer';
import { commonReducer } from './common/commonReducer';
import { stocksReducer } from './stocks/stocksReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  stocks: stocksReducer,
  common: commonReducer
});

export type RootState = ReturnType<typeof rootReducer>;