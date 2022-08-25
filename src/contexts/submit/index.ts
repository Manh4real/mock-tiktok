import React from 'react';

// types
import { ValidationType } from "_/validation/Validation";

export interface AllowedInputProperty {
    value: string;
    isValid: boolean;
}

export interface LoginWithPhoneFields {
    [ValidationType.PHONE]: AllowedInputProperty;
    [ValidationType.CODE]: AllowedInputProperty;
    [ValidationType.PASSWORD]: AllowedInputProperty;
}
export interface LoginWithEmailFields {
    [ValidationType.USERNAME]: AllowedInputProperty;
    [ValidationType.EMAIL]: AllowedInputProperty;
    [ValidationType.PASSWORD]: AllowedInputProperty;
}
export interface SignupWithPhone {
    [ValidationType.BIRTHDAY]: AllowedInputProperty;
    [ValidationType.PHONE]: AllowedInputProperty;
    [ValidationType.CODE]: AllowedInputProperty;
}
export interface SignupWithEmail {
    [ValidationType.BIRTHDAY]: AllowedInputProperty;
    [ValidationType.EMAIL]: AllowedInputProperty;
    [ValidationType.CODE]: AllowedInputProperty;
    [ValidationType.PASSWORD]: AllowedInputProperty;
}
export interface ResetPasswordWithPhone {
    [ValidationType.PHONE]: AllowedInputProperty;
    [ValidationType.CODE]: AllowedInputProperty;
    [ValidationType.PASSWORD]: AllowedInputProperty;
}
export interface ResetPasswordWithEmail {
    [ValidationType.EMAIL]: AllowedInputProperty;
    [ValidationType.CODE]: AllowedInputProperty;
    [ValidationType.PASSWORD]: AllowedInputProperty;
}

interface FormSet {
    loginWithPhone: LoginWithPhoneFields,
    loginWithEmail: LoginWithEmailFields,
    signupWithPhone: SignupWithPhone,
    signupWithEmail: SignupWithEmail,
    resetPasswordWithPhone: ResetPasswordWithPhone,
    resetPasswordWithEmail: ResetPasswordWithEmail,
}

// variables
const formFieldValue: AllowedInputProperty = {
    value: "",
    isValid: false,
};

export const formSet: FormSet = {
    loginWithPhone: {
        phone: formFieldValue,
        code: formFieldValue,
        password: formFieldValue,
    },
    loginWithEmail: {
        username: formFieldValue,
        email: formFieldValue,
        password: formFieldValue,
    },
    signupWithPhone: {
        birthday: formFieldValue,
        phone: formFieldValue,
        code: formFieldValue,
    },
    signupWithEmail: {
        birthday: formFieldValue,
        email: formFieldValue,
        password: formFieldValue,
        code: formFieldValue,
    },
    resetPasswordWithPhone: {
        phone: formFieldValue,
        code: formFieldValue,
        password: formFieldValue,
    },
    resetPasswordWithEmail: {
        email: formFieldValue,
        password: formFieldValue,
        code: formFieldValue,
    },
};

// Submit context
export interface SubmitContextValue<T> {
    isAllowed: T;
    setIsAllowed: React.Dispatch<React.SetStateAction<T>>;
    isAllGood: boolean;
}
