import { ActionCreator } from 'redux';
import { Dispatch } from 'react';
import { Alert } from './types/Alert';
import { AlertActionTypes } from './types/AlertsActionTypes';
import { setAlertsLoadingStateAction } from '../common/setAlertsLoadingStateAction';
import { alertsAPI } from './api/alertsAPI';
import { FETCH_ALERTS } from './types/FetchAlerts';

const fetchAlertsResult: ActionCreator<AlertActionTypes> = (alerts: Alert[]) => {
  return { type: FETCH_ALERTS, payload: alerts };
}

export const fetchAlertsAction = () => {
    return (dispatch:Dispatch<any>) => {
        dispatch(setAlertsLoadingStateAction(true));
        return alertsAPI.fetchAlerts()
            .then(data => dispatch(fetchAlertsResult(data.map(d => ({
                AlertValue: d.alertValue,
                DeviceId: d.deviceId,
                StockName: d.stockName,
                StockSymbol: d.stockSymbol
            } as Alert)))))
            .catch(() => { })
            .finally(() => dispatch(setAlertsLoadingStateAction(false)));
    }
}
