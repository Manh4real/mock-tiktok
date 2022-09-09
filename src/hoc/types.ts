import React from "react";
import { ValidateValue } from "_/validation/Validation";

export interface WithInputValidation {
    hasError: boolean;
    isEmpty: boolean;
    isValid: boolean;
    errorMessage: string;
    reset: () => void;
    setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
    validate: (value: string) => ValidateValue;
    inputProps: {
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
        onFocus: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
        onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    };
}

export interface WithFileValidation {
    isEmpty: boolean;
    isValid: boolean;
    hasError: boolean;
    errorMessage: string;
    reset: () => void;
    inputProps: {
        url: string;
        file: File;
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    };
    dragAndDropHandlers: {
        handleDrop: React.DragEventHandler;
        handleDragOver: React.DragEventHandler;
    }
}
