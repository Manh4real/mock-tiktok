import React, { useContext } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

// components
import {
  PasswordInput,
  EmailInput,
} from "_/components/LoginModal/form-elements";
import CustomButton from "_/components/CustomButton";

import WithPhoneLogin from "./WithPhoneLogin";
import ResetPassword from "./ResetPassword";
import Footer from "./Footer";

// styles
import styles from "../LoginModal.module.scss";

// context
import { History } from "..";

// types
import { FormLocation, FormProps } from "../types";
import routes from "_/config/routes";

function WithEmailLogin(props: FormProps) {
  return (
    <>
      <Form {...props} />
    </>
  );
}

const Form = ({ at = FormLocation.MODAL }: FormProps) => {
  const { pushHistory } = useContext(History);

  const replace = true;

  return (
    <>
      <form className={clsx(styles["form"], styles["content-wrapper"])}>
        <div className={styles["title"]}>Log in</div>
        <div className={styles["form__content"]}>
          <div className={clsx(styles["row"], styles["form__desc"])}>
            Email or username
            <Link
              to={routes.login + "/phone"}
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
          <EmailInput />
          <PasswordInput setIsAllowed={() => {}} />
          <Link
            to={routes.reset}
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
            className={clsx(styles["row"], styles["submit-button"])}
          >
            Log in
          </CustomButton>
        </div>
      </form>
      <Footer at={at} />
    </>
  );
};

export default WithEmailLogin;
