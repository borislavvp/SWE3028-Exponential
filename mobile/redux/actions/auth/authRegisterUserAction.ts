import { ActionCreator } from 'redux';
import { AuthActionTypes } from './types/AuthActionTypes';
import { Dispatch } from 'react';
import { AuthState, InitialAuthState } from '../../reducers/auth/types/AuthState';
import { authAPI } from './api/authAPI';
import { AuthRegisterInputModel, AUTH_REGISTER } from './types/AuthRegister';
import { storeAuthToLocalStorage } from './utils/authLocalStorageUtils';
import { tokenMonitorAction } from './tokenMonitorActioon';

const authRegisterUserResult: ActionCreator<AuthActionTypes> = (authState: AuthState) => {
  return { type: AUTH_REGISTER, payload: authState };
}

export const authRegisterUserAction = (registerUserModel: AuthRegisterInputModel) => {
    return (dispatch: Dispatch<any>) => {
      try {
          return authAPI.registerUser(registerUserModel)
                .then(res => {
                    storeAuthToLocalStorage(res)
                      .then(() => {
                        const data = { ...res, logged: true };
                        dispatch(authRegisterUserResult(data))
                        dispatch(tokenMonitorAction())
                      })
                      .catch(() => { })
                })
              .catch(() => { })
        } catch(e) {}   
    }
}