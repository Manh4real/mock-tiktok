import React, { useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

// services
import { login } from "_/services/auth";

// components
import {
  PasswordInput,
  EmailInput,
} from "_/components/LoginModal/form-elements";
import CustomButton from "_/components/CustomButton";

import WithPhoneLogin from "./WithPhoneLogin";
import ResetPassword from "./ResetPassword";
import Footer from "./Footer";

// icons
import { Spinner } from "_/components/icons";

// styles
import styles from "../LoginModal.module.scss";

// context
import { History } from "..";
import { CurrentUser } from "_/contexts";

// config
import routes from "_/config/routes";

// context
import { useLoginContext, useModalContext } from "_/contexts";
import { SubmitProvider, useSubmit } from "_/contexts/submit/loginWithEmail";

// hooks
import { useRedirect } from "_/hooks";

// types
import { FormLocation, FormProps } from "../types";
import { ValidationType } from "_/validation/Validation";
import { AllowedInputProperty } from "_/contexts/submit";

function WithEmailLogin(props: FormProps) {
  return (
    <SubmitProvider>
      <Form {...props} />
    </SubmitProvider>
  );
}

const Form = ({ at = FormLocation.MODAL }: FormProps) => {
  const { pushHistory } = useContext(History);
  const { clearModal } = useModalContext();

  const { setCurrentUserInfo } = useLoginContext();

  const { redirect, redirectSearchParamString: redirectSearchParams } =
    useRedirect();
  // submit
  const { isAllGood, isAllowed, setIsAllowed } = useSubmit();

  const [loading, setLoading] = useState<boolean>(false);

  //
  const replace = true;

  const handleSubmit = (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();

    // login with phone
    if (!isAllGood) {
      return;
    }

    setLoading(true);

    login(isAllowed.email.value, isAllowed.password.value)
      .then((result: CurrentUser["info"]) => {
        if (at === FormLocation.MODAL) clearModal();
        else if (at === FormLocation.PAGE) redirect();

        alert("Logged in.");
        setCurrentUserInfo(result);
      })
      .catch(() => {
        alert("Invalid Email or Password.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const setIsAllowed_email = useCallback(
    ({ value, isValid }: AllowedInputProperty) => {
      setIsAllowed((prev) => ({
        ...prev,
        [ValidationType.EMAIL]: { value, isValid },
      }));
    },
    [setIsAllowed]
  );

  const setIsAllowed_password = useCallback(
    ({ value, isValid }: AllowedInputProperty) => {
      setIsAllowed((prev) => ({
        ...prev,
        [ValidationType.PASSWORD]: { value, isValid },
      }));
    },
    [setIsAllowed]
  );

  return (
    <>
      <form
        action=""
        className={clsx(styles["form"], styles["content-wrapper"])}
        onSubmit={handleSubmit}
      >
        <div className={styles["title"]}>Log in</div>
        <div className={styles["form__content"]}>
          <div className={clsx(styles["row"], styles["form__desc"])}>
            Email or username
            <Link
              to={routes.login + "/phone" + redirectSearchParams}
              replace={replace}
              onClick={(e) => {
                if (at === FormLocation.MODAL) {
                  e.preventDefault();

                  pushHistory(<WithPhoneLogin />, replace);
                  return;
                }
              }}
            >
              Log in with phone
            </Link>
          </div>
          <EmailInput setIsAllowed={setIsAllowed_email} />
          <PasswordInput setIsAllowed={setIsAllowed_password} />
          <Link
            to={routes.reset + redirectSearchParams}
            className={styles["row"]}
            onClick={(e) => {
              if (at === FormLocation.MODAL) {
                e.preventDefault();

                pushHistory(<ResetPassword resetWith="email" />);
                return;
              }
            }}
          >
            Forgot password?
          </Link>
          <CustomButton
            primary
            large
            disabled={!isAllGood}
            className={clsx(styles["row"], styles["submit-button"])}
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
};

export default WithEmailLogin;
