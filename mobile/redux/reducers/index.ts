import { combineReducers } from 'redux';
import { authReducer } from './auth/authReducer';
import { commonReducer } from './common/commonReducer';
import { notificationsReducer } from './notifications/notificationsReducer';
import { stocksReducer } from './stocks/stocksReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  stocks: stocksReducer,
  notifications:notificationsReducer,
  common: commonReducer
});

export type RootState = ReturnType<typeof rootReducer>;