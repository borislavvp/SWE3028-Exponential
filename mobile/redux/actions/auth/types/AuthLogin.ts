import { AuthState } from "../../../reducers/auth/types/AuthState";

export const AUTH_LOGIN = "AUTH_LOGIN";

export interface AuthLoginInputModel{
  Password: string,
  Email: string,
}

export interface AuthLogin{
    type: typeof AUTH_LOGIN,
    payload: AuthState
}