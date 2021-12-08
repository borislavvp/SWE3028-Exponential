import { combineReducers } from 'redux';
import { authReducer } from './auth/authReducer';
import { stocksReducer } from './stocks/stocksReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  stocks: stocksReducer
});

export type RootState = ReturnType<typeof rootReducer>;