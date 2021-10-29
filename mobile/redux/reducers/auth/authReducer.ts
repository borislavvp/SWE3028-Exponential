import { AuthActionTypes } from '../../actions/auth/types/AuthActionTypes';
import { AUTH_INITIALIZE } from '../../actions/auth/types/AuthInitialize';
import { AUTH_LOGIN } from '../../actions/auth/types/AuthLogin';
import { AUTH_REGISTER } from '../../actions/auth/types/AuthRegister';
import { AUTH_TOKEN_REFRESH_TYPE } from '../../actions/auth/types/AuthTokenRefresh';
import { AuthState, InitialAuthState } from './types/AuthState';

export function authReducer(state: AuthState = InitialAuthState, action: AuthActionTypes): AuthState {
  switch (action.type) {
    case AUTH_INITIALIZE: {
      return {
        ...action.payload
      };
    }
    case AUTH_REGISTER: {
      return {
        ...action.payload
      };
    }
    case AUTH_LOGIN: {
      return {
        ...action.payload
      };
    }
    case AUTH_TOKEN_REFRESH_TYPE: {
      return {
        ...state,
        token: action.payload.token
      };
    }
    default:
      return state
  }
};