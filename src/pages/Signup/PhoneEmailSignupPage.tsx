import React from "react";

// styles
import styles from "../Login/Login.module.scss";

// components
import PhoneEmailSignup from "_/components/LoginModal/signup/PhoneEmailSignup";

// types
import { FormLocation } from "_/components/LoginModal/types";

function PhoneEmailSignupPage() {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["container"]}>
        <div className={styles["content"]}>
          <PhoneEmailSignup at={FormLocation.PAGE} />
        </div>
      </div>
    </div>
  );
}

export default PhoneEmailSignupPage;
