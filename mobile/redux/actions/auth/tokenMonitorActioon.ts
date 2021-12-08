import { Dispatch } from "redux";
import { AuthState } from "../../reducers/auth/types/AuthState";
import { RootState } from "../../store";
import { authAPI } from "./api/authAPI";
import { authInitializeAction } from "./authInitializeAction";
import { deleteAuthFromLocalStorage, storeAuthToLocalStorage } from "./utils/authLocalStorageUtils";

export function tokenMonitorAction() {
    return (dispatch: Dispatch<any>,getState:() => RootState) => {
        async function refresh(refreshTime: number) {
        const auth = getState().auth;
            if (!auth.logged) return;
            try {
                const data = await authAPI.refreshToken();
                storeAuthToLocalStorage(data).then(() => dispatch(authInitializeAction()))
            } catch (error) {
                window.setTimeout(() => refresh(refreshTime), refreshTime);
            }
        }
        function checkValid() {
            const auth = getState().auth;
            const delta = auth.tokenExpiration?.diffNow("milliseconds").milliseconds;
            if (delta === undefined || delta > 0) return;
            console.log(auth.tokenExpiration);
            console.log(delta);
            deleteAuthFromLocalStorage()
                .then(() => dispatch(authInitializeAction()))
                .catch(() => checkValid())
        }
        function startMonitoring() {
            const auth = getState().auth;
            if (!auth.logged || auth.tokenExpiration === null) return;
            const deltaTime = auth.tokenExpiration.diffNow("milliseconds").milliseconds;
        
            //Trying to refresh 5 times until the token expires seems like a good default. Not too few, not too many.
            const refreshTime = deltaTime / 5;
        
            //Adding 50 milliseconds to the time to ensure event loop
            //shenanigans don't happen and the code validation check
            //doesn't execute before the expiration time
            const invalidationTime = deltaTime + 50;
        
            window.setTimeout(() => refresh(refreshTime), refreshTime);
            window.setTimeout(() => checkValid(), invalidationTime);
            checkValid();
        }
        startMonitoring();
    }
}
