import React, { useState } from "react";
import clsx from "clsx";

// components
import CustomButton from "_/components/CustomButton";
import {
  PasswordInput,
  PhoneInput,
  EmailInput,
  CodeInput,
} from "_/components/LoginModal/form-elements";
import Footer from "./Footer";

// styles
import styles from "../LoginModal.module.scss";

enum State {
  WITH_EMAIL,
  WITH_PHONE,
}
export interface ResetPasswordProps {
  resetWith?: "phone" | "email";
}

function ResetPassword({ resetWith = "phone" }: ResetPasswordProps) {
  const [state, setState] = useState<State>(() => {
    if (resetWith === "email") return State.WITH_EMAIL;
    else if (resetWith === "phone") return State.WITH_PHONE;
    else return State.WITH_PHONE;
  });

  return (
    <>
      <form className={clsx(styles["content-wrapper"], styles["form"])}>
        <div className={styles["title"]}>Reset password</div>
        <div className={styles["form__content"]}>
          <div className={clsx(styles["row"], styles["form__desc"])}>
            Enter phone number
            {state === State.WITH_PHONE && (
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  setState(State.WITH_EMAIL);
                }}
              >
                Reset with email
              </a>
            )}
            {state === State.WITH_EMAIL && (
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  setState(State.WITH_PHONE);
                }}
              >
                Reset with phone number
              </a>
            )}
          </div>

          {state === State.WITH_EMAIL && <EmailInput />}
          {state === State.WITH_PHONE && <PhoneInput />}

          <CodeInput />
          <PasswordInput />
          <div style={{ paddingTop: "9px" }}>
            <CustomButton
              primary
              large
              className={clsx(styles["row"], styles["submit-button"])}
            >
              Log in
            </CustomButton>
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
}

export default ResetPassword;
