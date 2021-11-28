import { AxiosInstance } from "axios";

export function deleteHeader(caller:AxiosInstance, header: string) {
    delete caller.defaults.headers.common[header];
}
export function setHeader(caller:AxiosInstance,header: string, value: any) {
    caller.defaults.headers.common[header] = value;
}

export function setAuthHeaders(callers: AxiosInstance[], token: string) {
    callers.forEach(c => setHeader(c,"Authorization", `Bearer ${token}`))
}

export function deleteAuthHeaders(callers: AxiosInstance[]) {
    callers.forEach(c => deleteHeader(c, "Authorization"));
}