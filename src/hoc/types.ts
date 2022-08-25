export interface WithInputValidation {
    hasError: boolean;
    isEmpty: boolean;
    isValid: boolean;
    errorMessage: string;
    inputProps: {
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        onFocus: React.FocusEventHandler<HTMLInputElement>;
        onBlur: React.FocusEventHandler<HTMLInputElement>;
    };
}
