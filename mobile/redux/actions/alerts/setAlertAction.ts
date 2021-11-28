import { ActionCreator } from 'redux';
import { Dispatch } from 'react';
import { Alert } from './types/Alert';
import { AlertActionTypes } from './types/AlertsActionTypes';
import { setAlertsLoadingStateAction } from '../common/setAlertsLoadingStateAction';
import { alertsAPI } from './api/alertsAPI';
import { SET_ALERT } from './types/SetAlert';
import { navigate } from '../../../navigation';

const setAlertResult: ActionCreator<AlertActionTypes> = (alert: Alert) => {
  return { type: SET_ALERT, payload: alert };
}

export const setALertAction = (alert:Alert) => {
    return (dispatch:Dispatch<any>) => {
        dispatch(setAlertsLoadingStateAction(true));
        return alertsAPI.setAlert(alert)
            .then(data => dispatch(setAlertResult(data)))
            .then(() => navigate("Alerts", {}))
            .catch(() => { })
            .finally(() => dispatch(setAlertsLoadingStateAction(false)));
    }
}
