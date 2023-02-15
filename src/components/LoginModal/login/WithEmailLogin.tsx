import React, { useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

// components
import {
  PasswordInput,
  EmailInput,
} from "_/components/LoginModal/form-elements";
import CustomButton from "_/components/CustomButton";

// import WithPhoneLogin from "./WithPhoneLogin";
// import ResetPassword from "./ResetPassword";
import Footer from "./Footer";

// icons
import { Spinner } from "_/components/icons";

// styles
import styles from "../LoginModal.module.scss";

// context
import { History } from "..";

// config
import routes from "_/config/routes";

import { SubmitProvider, useSubmit } from "_/contexts/submit/loginWithEmail";

// hooks
import { useRedirect } from "_/hooks";

// types
import { FormLocation, FormProps } from "../types";
import { ValidationType } from "_/validation/Validation";
import { AllowedInputProperty } from "_/contexts/submit";

import { ILoginModalContentType } from "_/components/LoginModal/types";

// context
import { useLoginModalToggle } from "../context";

// Redux
import { login } from "_/features/currentUser/currentUserSlice";
import { useAppDispatch } from "_/features/hooks";
import { show } from "_/features/alert/alertSlice";

function WithEmailLogin(props: FormProps) {
  return (
    <SubmitProvider>
      <Form {...props} />
    </SubmitProvider>
  );
}

const Form = ({ at = FormLocation.MODAL }: FormProps) => {
  const { pushHistory } = useContext(History);
  const { handleClose: clearModal } = useLoginModalToggle();

  const dispatch = useAppDispatch();

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

    if (loading) return;

    setLoading(true);
    // dispatch(
    //   show({
    //     message: `Failed to login.`,
    //   })
    // );
    dispatch(
      login({
        email: isAllowed.email.value,
        password: isAllowed.password.value,
      })
    )
      .unwrap()
      .then(() => {
        if (at === FormLocation.MODAL) {
          clearModal(e as React.MouseEvent);
        } else if (at === FormLocation.PAGE) redirect();

        // alert("Logged in.");
        dispatch(show({ message: "Logged in." }));
      })
      .catch((e) => {
        console.log("Failed to login.", e);

        // alert("Failed to login.\nCheck your infomation or network connection.");
        dispatch(
          show({
            message: `Failed to login.
               Check your infomation or network connection.`,
          })
        );
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

                  // pushHistory(<WithPhoneLogin />, replace);
                  pushHistory(ILoginModalContentType.LOGIN_W_PHONE, replace);
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

                // pushHistory(<ResetPassword resetWith="email" />);
                pushHistory(ILoginModalContentType.LOGIN_EMAIL_RESET_PW);
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
