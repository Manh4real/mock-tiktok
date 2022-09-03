import React from 'react';

// types
import { ValidationType } from "_/validation/Validation";
import { Viewer, ViewerPermission } from "_/types";

export interface AllowedInputProperty<T extends string | File = string> {
    value: T;
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
export interface UpdateProfile {
    [ValidationType.PHOTO]: {
        value: File | null;
        isValid: boolean;
    };
    [ValidationType.USERNAME]: AllowedInputProperty;
    [ValidationType.NAME]: AllowedInputProperty;
    [ValidationType.BIO]: AllowedInputProperty;
}
export interface Upload {
    [ValidationType.VIDEO]: {
        value: File | null;
        isValid: boolean;
    };
    [ValidationType.CAPTION]: AllowedInputProperty;
    "viewable": Viewer;
    "allows[]": ViewerPermission;
}

interface FormSet {
    loginWithPhone: LoginWithPhoneFields,
    loginWithEmail: LoginWithEmailFields,
    signupWithPhone: SignupWithPhone,
    signupWithEmail: SignupWithEmail,
    resetPasswordWithPhone: ResetPasswordWithPhone,
    resetPasswordWithEmail: ResetPasswordWithEmail,
    updateProfile: UpdateProfile,
    upload: Upload
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
    updateProfile: {
        photo: {
            isValid: false,
            value: null
        },
        username: formFieldValue,
        name: formFieldValue,
        bio: formFieldValue
    },
    upload: {
        video: {
            isValid: false,
            value: null
        },
        caption: formFieldValue,
        "allows[]": ["comment"],
        viewable: "public"
    }
};

// Submit context
export interface SubmitContextValue<T> {
    isAllowed: T;
    setIsAllowed: React.Dispatch<React.SetStateAction<T>>;
    isAllGood: boolean;
}
export type SetIsAllowedFunc<T extends string | File = string> =
    ({ value, isValid }: AllowedInputProperty<T>) => void;

export interface SubmitContext__InputProps<T extends string | File = string> {
    setIsAllowed: SetIsAllowedFunc<T>
}