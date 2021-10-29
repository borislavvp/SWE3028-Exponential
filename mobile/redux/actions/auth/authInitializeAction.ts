import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_INITIALIZE } from './types/AuthInitialize';
import { ActionCreator } from 'redux';
import { AuthActionTypes } from './types/AuthActionTypes';
import { Dispatch } from 'react';
import { AuthState, InitialAuthState } from '../../reducers/auth/types/AuthState';
import { AuthStorageKey } from './types/AuthStorageKey';
import { tokenMonitorAction } from './tokenMonitorActioon';
import { DateTime } from 'luxon';
import { RootState } from '../../store';

const authDataInitializedResult: ActionCreator<AuthActionTypes> = (authState: AuthState) => {
  return { type: AUTH_INITIALIZE, payload: authState };
}

export const authInitializeAction = () => {
    return async (dispatch:Dispatch<any>,getState:() => RootState) => {
       try {
           console.log(getState().auth);
           const storedData = await AsyncStorage.getItem(AuthStorageKey)
           if (storedData !== null) {
               const data = { ...JSON.parse(storedData), logged: true };
               data.tokenExpiration =  DateTime.fromISO(data.tokenExpiration);
               dispatch(authDataInitializedResult(data));
               dispatch(tokenMonitorAction());
            } else {
                dispatch(authDataInitializedResult(InitialAuthState))
            }
        } catch(e) {}   
    }
}
