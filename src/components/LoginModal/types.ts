export enum FormLocation {
    PAGE = "formAtPage",
    MODAL = "formAtModal"
}

export interface FormProps {
    at?: FormLocation
}

export enum ILoginModalContentType {
    LOGIN_START = "login-start",
    LOGIN_W_EMAIL = "login-with-email",
    LOGIN_W_PHONE = "login-with-phone",
    LOGIN_EMAIL_RESET_PW = "reset-password-with-email",
    LOGIN_PHONE_RESET_PW = "reset-password-with-phone",
    SIGNUP_START = "signup-start",
    SIGNUP_W_EMAIL_PHONE = "signup-with-email-phone"
}