import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthState } from "../../../reducers/auth/types/AuthState";
import { deleteAuthHeader, setAuthHeader } from "../api/authAPI";
import { AuthStorageKey } from "../types/AuthStorageKey";

export const storeAuthToLocalStorage = (authData: AuthState) => {
    return new Promise<void>((resolve, reject) => {
        AsyncStorage.setItem(AuthStorageKey, JSON.stringify({ ...authData,tokenExpiration: authData.tokenExpiration?.toISO() }))
            .then(() => {
                setAuthHeader(authData.token);
                resolve();
            })
            .catch(() => reject());
    })
}

export const deleteAuthFromLocalStorage = () => {
    return new Promise<void>((resolve, reject) => {
        AsyncStorage.removeItem(AuthStorageKey)
            .then(() => {
                deleteAuthHeader();
                resolve();
            })
            .catch(() => reject());
    })
}
