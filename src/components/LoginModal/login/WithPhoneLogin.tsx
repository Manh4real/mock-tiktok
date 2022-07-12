import React, { useContext, useState } from "react";
import clsx from "clsx";

// styles
import styles from "../LoginModal.module.scss";

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

function WithPhoneLogin() {
  const { pushHistory } = useContext(History);

  const [isWithPassword, setIsWithPassword] = useState<boolean>(false);

  return (
    <>
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
          >
            Log in
          </CustomButton>
        </div>
      </form>
      <Footer />
    </>
  );
}

export default WithPhoneLogin;
