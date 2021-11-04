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
import { startSocketClientAction } from '../socket/startSocketClientAction';
import { setAuthHeader } from './api/authAPI';
import { setAuthLoadingStateAction } from '../common/setAuthLoadingStateAction';

const authDataInitializedResult: ActionCreator<AuthActionTypes> = (authState: AuthState) => {
  return { type: AUTH_INITIALIZE, payload: authState };
}

export const authInitializeAction = () => {
    return (dispatch:Dispatch<any>) => {
        dispatch(setAuthLoadingStateAction(true));
        AsyncStorage.getItem(AuthStorageKey)
            .then(storedData => {
                if (storedData !== null) {
                    const data = { ...JSON.parse(storedData), logged: true };
                    data.tokenExpiration = DateTime.fromISO(data.tokenExpiration);
                    setAuthHeader(data.token);
                    dispatch(authDataInitializedResult(data));
                    dispatch(tokenMonitorAction());
                    dispatch(startSocketClientAction());
                } else {
                    dispatch(authDataInitializedResult(InitialAuthState))
                }
            })
            .catch(() => { })
            .finally(() => dispatch(setAuthLoadingStateAction(false)));
    }
}
