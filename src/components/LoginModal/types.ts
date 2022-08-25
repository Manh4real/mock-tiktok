export enum FormLocation {
    PAGE = "formAtPage",
    MODAL = "formAtModal"
}

export interface FormProps {
    at?: FormLocation
}