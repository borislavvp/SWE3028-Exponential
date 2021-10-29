export const AUTH_TOKEN_REFRESH_TYPE = "AUTH_TOKEN_REFRESH_TYPE";
export interface AuthTokenRefresh{
    type: typeof AUTH_TOKEN_REFRESH_TYPE,
    payload: {
        token:string
    }
}