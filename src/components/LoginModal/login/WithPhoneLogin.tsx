import React, { useCallback, useContext, useState } from "react";
import { Link } from "react-router-dom";
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

// context
import { History } from "_/components/LoginModal";
import { SubmitProvider, useSubmit } from "_/contexts/submit/loginWithPhone";

// config
import routes from "_/config/routes";

// types
import { ValidationType } from "_/validation/Validation";
import { AllowedInputProperty } from "_/contexts/submit";
import { FormLocation, FormProps } from "../types";

const WithPhoneLogin = (props: FormProps) => {
  return (
    <SubmitProvider>
      <Form {...props} />
    </SubmitProvider>
  );
};

//
function Form({ at = FormLocation.MODAL }: FormProps) {
  const { pushHistory } = useContext(History);

  // submit
  const { isAllGood, isAllowed, setIsAllowed } = useSubmit();

  const [isWithPassword, setIsWithPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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

  const setIsAllowed_phone = useCallback(
    ({ value, isValid }: AllowedInputProperty) => {
      setIsAllowed((prev) => ({
        ...prev,
        [ValidationType.PHONE]: { value, isValid },
      }));
    },
    [setIsAllowed]
  );

  const setIsAllowed_code = useCallback(
    ({ value, isValid }: AllowedInputProperty) => {
      setIsAllowed((prev) => ({
        ...prev,
        [ValidationType.CODE]: { value, isValid },
      }));
    },
    [setIsAllowed]
  );

  //
  const replace = true;
  const atModalFunc = (callback: () => void) => {
    if (at === FormLocation.MODAL) {
      callback();
    }
  };

  return (
    <>
      <form className={clsx(styles["form"], styles["content-wrapper"])}>
        <div className={styles["title"]}>Log in</div>
        <div className={styles["form__content"]}>
          <div className={clsx(styles["row"], styles["form__desc"])}>
            Phone
            <Link
              to={routes.login + "/email"}
              replace={replace}
              onClick={(e) => {
                atModalFunc(() => {
                  e.preventDefault();
                  pushHistory(<WithEmailLogin />, replace);
                  return;
                });
              }}
            >
              Log in with email or username
            </Link>
          </div>
          <PhoneInput setIsAllowed={setIsAllowed_phone} />
          {!isWithPassword && (
            <CodeInput
              setIsAllowed={setIsAllowed_code}
              disabled={!isAllowed.phone.isValid}
            />
          )}
          {isWithPassword && <PasswordInput setIsAllowed={() => {}} />}
          {isWithPassword ? (
            <div
              className={styles["row"]}
              style={{ display: "flex", gap: "8px" }}
            >
              <Link
                to={routes.reset}
                onClick={(e) => {
                  atModalFunc(() => {
                    e.preventDefault();
                    pushHistory(<ResetPassword />);
                  });
                }}
              >
                Forgot password?
              </Link>
              <Link
                to={routes.login + "/phone/code"}
                onClick={(e) => {
                  e.preventDefault();
                  setIsWithPassword(false);
                }}
              >
                Log in with code
              </Link>
            </div>
          ) : (
            <Link
              to={routes.login + "/phone/password"}
              className={styles["row"]}
              onClick={(e) => {
                e.preventDefault();
                setIsWithPassword(true);
              }}
            >
              Log in with password
            </Link>
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
      <Footer at={at} />
    </>
  );
}

export default WithPhoneLogin;
