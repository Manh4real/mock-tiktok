import React, { useContext, useState } from "react";

// types
import { ValidationType } from "_/validation/Validation";
import { ValueOf, Viewer, ViewerPermission } from "_/types";

export interface AllowedInputProperty<T extends string | File = string> {
  value: T extends File ? T | null : T;
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
  viewable: Viewer;
  "allows[]": ViewerPermission;
  thumbnail_time: number;
}

interface FormSet {
  loginWithPhone: LoginWithPhoneFields;
  loginWithEmail: LoginWithEmailFields;
  signupWithPhone: SignupWithPhone;
  signupWithEmail: SignupWithEmail;
  resetPasswordWithPhone: ResetPasswordWithPhone;
  resetPasswordWithEmail: ResetPasswordWithEmail;
  updateProfile: UpdateProfile;
  upload: Upload;
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
      value: null,
    },
    username: formFieldValue,
    name: formFieldValue,
    bio: formFieldValue,
  },
  upload: {
    video: {
      isValid: false,
      value: null,
    },
    caption: formFieldValue,
    "allows[]": ["comment"],
    viewable: "public",
    thumbnail_time: 2,
  },
};

// Submit context
export interface SubmitContextValue<
  T extends ValueOf<FormSet>,
  K extends Object = Object
> {
  isAllowed: T;
  setIsAllowed: React.Dispatch<React.SetStateAction<T>>;
  isAllGood: boolean;
  extra: K;
}
export type SetIsAllowedFunc<T extends string | File = string> = ({
  value,
  isValid,
}: AllowedInputProperty<T>) => void;

export interface SubmitContext__InputProps<T extends string | File = string> {
  setIsAllowed: SetIsAllowedFunc<T>;
}

interface CreatedSubmitContext<
  T extends ValueOf<FormSet>,
  K extends Object = Object
> {
  provider: React.FC<{ children: JSX.Element }>;
  useSubmit: () => SubmitContextValue<T, K>;
}

export function createSubmitContext<T extends ValueOf<FormSet>>(
  formSet: T,
  isAllGoodFn: (isAllowed: T) => boolean
): CreatedSubmitContext<T>;
export function createSubmitContext<
  T extends ValueOf<FormSet>,
  K extends Object
>(
  formSet: T,
  isAllGoodFn: (isAllowed: T) => boolean,
  additionalContextValue: K,
  additionalInitialContextValue: K
): CreatedSubmitContext<T, K>;

export function createSubmitContext<
  T extends ValueOf<FormSet>,
  K extends Object
>(
  formSet: T,
  isAllGoodFn: (isAllowed: T) => boolean,
  additionalContextValue = {} as K,
  additionalInitialContextValue = {} as K
): CreatedSubmitContext<T, K> {
  const Submit = React.createContext<SubmitContextValue<T, K>>({
    isAllowed: formSet,
    setIsAllowed: () => {},
    isAllGood: false,
    extra: additionalInitialContextValue,
  });

  const SubmitProvider = ({ children }: { children: JSX.Element }) => {
    const [isAllowed, setIsAllowed] = useState<T>(formSet);
    const isAllGood = isAllGoodFn(isAllowed);

    return (
      <Submit.Provider
        value={{
          isAllowed,
          setIsAllowed,
          isAllGood,
          extra: additionalContextValue,
        }}
      >
        {children}
      </Submit.Provider>
    );
  };

  return {
    provider: SubmitProvider,
    useSubmit: () => {
      return useContext(Submit);
    },
  };
}
