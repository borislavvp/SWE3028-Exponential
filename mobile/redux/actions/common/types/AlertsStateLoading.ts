export const ALERTS_STATE_LOADING = "ALERTS_STATE_LOADING";

export interface AlertsStateLoading {
    type: typeof ALERTS_STATE_LOADING,
    payload: boolean
}