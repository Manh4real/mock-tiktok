import React, { useState } from "react";
import clsx from "clsx";

// styles
import styles from "../LoginModal.module.scss";

// components
import CustomButton from "_/components/CustomButton";
import { BirthdayInput } from "_/components/LoginModal/form-elements";
import WithEmailSignup from "./WithEmailSignup";
import WithPhoneSignup from "./WithPhoneSignup";
import Footer from "./Footer";

// context

// types
enum State {
  WITH_PHONE,
  WITH_EMAIL,
}

function PhoneEmailSignup() {
  const [state, setState] = useState<State>(State.WITH_PHONE);

  let desc: JSX.Element | null = null;

  if (state === State.WITH_PHONE) {
    desc = <PhoneSignupDesc onClick={() => setState(State.WITH_EMAIL)} />;
  } else if (state === State.WITH_EMAIL) {
    desc = <EmailSignupDesc onClick={() => setState(State.WITH_PHONE)} />;
  }

  return (
    <>
      <form className={clsx(styles["form"], styles["content-wrapper"])}>
        <div className={styles["title"]}>Sign up</div>
        <div className={styles["form__content"]}>
          <BirthdayInput />
          <div className={clsx(styles["row"], styles["form__desc"])}>
            {desc}
          </div>

          {state === State.WITH_PHONE && <WithPhoneSignup />}
          {state === State.WITH_EMAIL && <WithEmailSignup />}

          {state === State.WITH_EMAIL && (
            <div className={styles["row"]}>
              <div className={styles["form__checkbox"]}>
                <input type="checkbox" id="cb" />
                <label htmlFor="cb" className={styles["form__label"]}>
                  Get trending content, newsletters, promotions,
                  recommendations, and account updates sent to your email
                </label>
              </div>
            </div>
          )}

          <CustomButton
            primary
            large
            className={clsx(styles["row"], styles["submit-button"])}
          >
            Next
          </CustomButton>
        </div>
      </form>
      <Footer />
    </>
  );
}

interface DescProps {
  onClick: () => void;
}

const PhoneSignupDesc = ({ onClick }: DescProps) => {
  return (
    <React.Fragment>
      Phone
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        Sign up with email
      </a>
    </React.Fragment>
  );
};

const EmailSignupDesc = ({ onClick }: DescProps) => {
  return (
    <React.Fragment>
      Email
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        Sign up with phone
      </a>
    </React.Fragment>
  );
};

export default PhoneEmailSignup;
