import { AuthState } from "../../../reducers/auth/types/AuthState";

export const AUTH_INITIALIZE = "AUTH_INITIALIZE";

export interface AuthInitialize{
    type: typeof AUTH_INITIALIZE,
    payload: AuthState
}