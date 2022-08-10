import React, { useContext, useState } from "react";
import clsx from "clsx";

// styles
import styles from "../LoginModal.module.scss";

// icons
import { Spinner } from "_/components/icons";

// components
import CustomButton from "_/components/CustomButton";
import {
  PhoneInput,
  PasswordInput,
  CodeInput,
} from "_/components/LoginModal/form-elements";

import WithEmailLogin from "./WithEmailLogin";
import ResetPassword from "./ResetPassword";
import Footer from "./Footer";

// external context
import { History } from "_/components/LoginModal";

// types
import { ValidationType } from "_/validation/Validation";

interface AllowedInputProperty {
  value: string;
  isValid: boolean;
}

interface LoginWithPhoneFields {
  [ValidationType.PHONE]: AllowedInputProperty;
  [ValidationType.CODE]: AllowedInputProperty;
  [ValidationType.PASSWORD]: AllowedInputProperty;
}

// variables
const formFieldValue: AllowedInputProperty = {
  value: "",
  isValid: false,
};

const formSet = {
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

// internal context
interface SubmitContextValue {
  isAllowed: {
    [ValidationType.PHONE]: AllowedInputProperty;
    [ValidationType.CODE]: AllowedInputProperty;
    [ValidationType.PASSWORD]: AllowedInputProperty;
  };
  setIsAllowed: React.Dispatch<React.SetStateAction<LoginWithPhoneFields>>;
}

export const Submit = React.createContext<SubmitContextValue>({
  isAllowed: formSet.loginWithPhone,
  setIsAllowed: () => {},
});

function WithPhoneLogin() {
  const { pushHistory } = useContext(History);

  const [isWithPassword, setIsWithPassword] = useState<boolean>(false);

  // submit
  const [loading, setLoading] = useState<boolean>(false);
  const [isAllowed, setIsAllowed] = useState<LoginWithPhoneFields>(
    formSet.loginWithPhone
  );

  const isAllGood =
    (isAllowed.phone.isValid && isAllowed.code.isValid) ||
    (isAllowed.phone.isValid && isAllowed.password.isValid);

  // console.log(isAllowed);

  const handleSubmit = (e: React.MouseEvent) => {
    // login with phone
    if (!isAllGood) {
      e.preventDefault();
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      console.log("Logged in with phone", isAllowed);
    }, 1000);
  };

  return (
    <Submit.Provider value={{ isAllowed, setIsAllowed }}>
      <form className={clsx(styles["form"], styles["content-wrapper"])}>
        <div className={styles["title"]}>Log in</div>
        <div className={styles["form__content"]}>
          <div className={clsx(styles["row"], styles["form__desc"])}>
            Phone
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();

                pushHistory(<WithEmailLogin />, true);
              }}
            >
              Log in with email or username
            </a>
          </div>

          <PhoneInput />
          {!isWithPassword && <CodeInput />}
          {isWithPassword && <PasswordInput />}

          {isWithPassword ? (
            <div
              className={styles["row"]}
              style={{ display: "flex", gap: "8px" }}
            >
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();

                  pushHistory(<ResetPassword />);
                }}
              >
                Forgot password?
              </a>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();

                  setIsWithPassword(false);
                }}
              >
                Log in with code
              </a>
            </div>
          ) : (
            <a
              href="/"
              className={styles["row"]}
              onClick={(e) => {
                e.preventDefault();

                setIsWithPassword(true);
              }}
            >
              Log in with password
            </a>
          )}

          <CustomButton
            primary
            large
            className={clsx(styles["row"], styles["submit-button"])}
            disabled={!isAllGood}
            onClick={handleSubmit}
          >
            {loading ? (
              <Spinner
                style={{ width: "15px", height: "15px", color: "#fff" }}
              />
            ) : (
              "Log in"
            )}
          </CustomButton>
        </div>
      </form>
      <Footer />
    </Submit.Provider>
  );
}

export default WithPhoneLogin;
