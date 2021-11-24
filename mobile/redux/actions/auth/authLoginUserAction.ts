import { ActionCreator } from 'redux';
import { AuthActionTypes } from './types/AuthActionTypes';
import { Dispatch } from 'react';
import { AuthState} from '../../reducers/auth/types/AuthState';
import { authAPI } from './api/authAPI';
import { storeAuthToLocalStorage } from './utils/authLocalStorageUtils';
import { tokenMonitorAction } from './tokenMonitorActioon';
import { AuthLoginInputModel, AUTH_LOGIN } from './types/AuthLogin';
import { startSocketClientAction } from '../socket/startSocketClientAction';
import { setAuthLoadingStateAction } from '../common/setAuthLoadingStateAction';

const authLoginUserResult: ActionCreator<AuthActionTypes> = (authState: AuthState) => {
  return { type: AUTH_LOGIN, payload: authState };
}

export const authLoginUserAction = (loginUserModel: AuthLoginInputModel) => {
    return (dispatch: Dispatch<any>) => {
        dispatch(setAuthLoadingStateAction(true));
        return authAPI.loginUser(loginUserModel)
              .then(res => {
                  storeAuthToLocalStorage(res)
                    .then(() => {
                      const data = { ...res, logged: true };
                      dispatch(authLoginUserResult(data));
                      dispatch(tokenMonitorAction());
                      // dispatch(startSocketClientAction());
                    })
                    .catch(() => { })
                    .finally(() => dispatch(setAuthLoadingStateAction(false)))
              })
              .catch(() => { })
              .finally(() => dispatch(setAuthLoadingStateAction(false)))
    }
}