import { AuthInitialize } from "./AuthInitialize";
import { AuthLogin } from "./AuthLogin";
import { AuthRegister } from "./AuthRegister";
import { AuthTokenRefresh } from "./AuthTokenRefresh";

export type AuthActionTypes = AuthRegister | AuthLogin | AuthTokenRefresh | AuthInitialize