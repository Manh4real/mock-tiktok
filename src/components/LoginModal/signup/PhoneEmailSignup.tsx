import React, { useState } from "react";
import clsx from "clsx";

// styles
import styles from "../LoginModal.module.scss";

// components
import WithEmailSignup from "./WithEmailSignup";
import WithPhoneSignup from "./WithPhoneSignup";
import Footer from "./Footer";

// types
import { FormLocation, FormProps } from "../types";

enum State {
  WITH_PHONE,
  WITH_EMAIL,
}

function PhoneEmailSignup({ at = FormLocation.MODAL }: FormProps) {
  const [state, setState] = useState<State>(State.WITH_EMAIL);

  return (
    <React.Fragment>
      <form className={clsx(styles["form"], styles["content-wrapper"])}>
        <div className={styles["title"]}>Sign up</div>
        <div className={styles["form__content"]}>
          {state === State.WITH_PHONE && (
            <WithPhoneSignup
              at={at}
              toggleToEmail={() => setState(State.WITH_EMAIL)}
            />
          )}
          {state === State.WITH_EMAIL && (
            <WithEmailSignup
              at={at}
              toggleToPhone={() => setState(State.WITH_PHONE)}
            />
          )}
        </div>
      </form>
      <Footer at={at} />
    </React.Fragment>
  );
}

export default PhoneEmailSignup;
