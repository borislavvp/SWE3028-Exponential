import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthState } from "../../../reducers/auth/types/AuthState";
import { alertsCaller } from "../../alerts/api/alertsAPI";
import { authCaller } from "../api/authAPI";
import { AuthStorageKey } from "../types/AuthStorageKey";
import { deleteAuthHeaders, setAuthHeaders } from "./axiosUtils";

export const storeAuthToLocalStorage = (authData: AuthState) => {
    return new Promise<void>((resolve, reject) => {
        AsyncStorage.setItem(AuthStorageKey, JSON.stringify({ ...authData,tokenExpiration: authData.tokenExpiration?.toISO() }))
            .then(() => {
                setAuthHeaders([authCaller,alertsCaller],authData.token);
                resolve();
            })
            .catch(() => reject());
    })
}

export const deleteAuthFromLocalStorage = () => {
    return new Promise<void>((resolve, reject) => {
        AsyncStorage.removeItem(AuthStorageKey)
            .then(() => {
                deleteAuthHeaders([authCaller,alertsCaller]);
                resolve();
            })
            .catch(() => reject());
    })
}
