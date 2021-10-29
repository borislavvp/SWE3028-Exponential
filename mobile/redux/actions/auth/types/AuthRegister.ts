import { AuthState } from "@/redux/reducers/auth/types/AuthState";

export const AUTH_REGISTER = "AUTH_REGISTER";

export interface AuthRegisterInputModel{
  Password: string,
  Email: string,
  PhoneNumber: string,
  FirstName: string,
  LastName:string
}

export interface AuthRegister{
    type: typeof AUTH_REGISTER,
    payload: AuthState
}