import React, { useContext } from "react";
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

function WithEmailLogin() {
  const { pushHistory } = useContext(History);

  return (
    <>
      <form className={clsx(styles["form"], styles["content-wrapper"])}>
        <div className={styles["title"]}>Log in</div>
        <div className={styles["form__content"]}>
          <div className={clsx(styles["row"], styles["form__desc"])}>
            Email or username
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();

                pushHistory(<WithPhoneLogin />, true);
              }}
            >
              Log in with phone
            </a>
          </div>
          <EmailInput />
          <PasswordInput />
          <a
            href="/"
            className={styles["row"]}
            onClick={(e) => {
              e.preventDefault();

              pushHistory(<ResetPassword resetWith="email" />);
            }}
          >
            Forgot password?
          </a>
          <CustomButton
            primary
            large
            className={clsx(styles["row"], styles["submit-button"])}
          >
            Log in
          </CustomButton>
        </div>
      </form>
      <Footer />
    </>
  );
}

export default WithEmailLogin;
