import axios, { AxiosResponse } from 'axios';
import { DateTime, Duration } from 'luxon';
import { AuthState } from '../../../reducers/auth/types/AuthState';
import { AuthLoginInputModel } from '../types/AuthLogin';
import { AuthRegisterInputModel } from '../types/AuthRegister';
import { deleteHeader, setHeader } from '../utils/axiosUtils';

const base = "http://10.0.2.2:64438/api/identity";
export const authCaller = axios.create({ baseURL: base })
export interface AuthResponse {
  userEmail: string,
  token: string,
  tokenExpiration: number,
}

const convertResponseData = (response: AuthResponse): AuthState => {
  return {
    ...response,
    logged: response.token != "",
    tokenExpiration: DateTime.local().plus(
      Duration.fromObject({ seconds: response.tokenExpiration * 60 })
    )
 }
}
export const authAPI = {
  registerUser(input:AuthRegisterInputModel): Promise<AuthState> {
    return new Promise((resolve,reject) => {
        authCaller
            .post(`${base}/registration`,
                input
            )
            .then((res: AxiosResponse<AuthResponse>) => resolve(convertResponseData(res.data)))
            .catch(() => reject());
    });
  },
  loginUser(input:AuthLoginInputModel): Promise<AuthState> {
    return new Promise((resolve, reject) => {
        authCaller
            .post(`${base}/login`,
              input
            )
            .then((res: AxiosResponse<AuthResponse>) => resolve(convertResponseData(res.data)))
          .catch((e) => {console.log( e) ;
            reject();
          });
    });
  },
  refreshToken(): Promise<AuthState> {
    return new Promise((resolve,reject) => {
        authCaller
            .post(`${base}/token/refresh`)
            .then((res: AxiosResponse<AuthResponse>) => resolve(convertResponseData(res.data)))
            .catch(() => reject());
    });
  }
};