import React from "react";

// styles
import styles from "./Login.module.scss";

// components
import WithEmailLogin from "_/components/LoginModal/login/WithEmailLogin";

// types
import { FormLocation } from "_/components/LoginModal/types";

function LoginWithEmail() {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["container"]}>
        <div className={styles["content"]}>
          <WithEmailLogin at={FormLocation.PAGE} />
        </div>
      </div>
    </div>
  );
}

export default LoginWithEmail;
