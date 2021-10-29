import {DateTime} from 'luxon';
export interface AuthState {
    userEmail: string,
    token: string,
    tokenExpiration: DateTime | null,
    logged:boolean
}

export const InitialAuthState: AuthState = {
    userEmail: "",
    token: "",
    tokenExpiration: null,
    logged: false
}