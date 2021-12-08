import { AxiosInstance } from "axios";

export function deleteHeader(caller:AxiosInstance, header: string) {
    delete caller.defaults.headers.common[header];
}
export function setHeader(caller:AxiosInstance,header: string, value: any) {
    caller.defaults.headers.common[header] = value;
}
