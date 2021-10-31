export const AUTH_STATE_LOADING = "AUTH_STATE_LOADING";

export interface AuthStateLoading {
    type: typeof AUTH_STATE_LOADING,
    payload: boolean
}