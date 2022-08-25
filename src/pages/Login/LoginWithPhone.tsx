import React from "react";

// styles
import styles from "./Login.module.scss";

// components
import WithPhoneLogin from "_/components/LoginModal/login/WithPhoneLogin";
import { FormLocation } from "_/components/LoginModal/types";

function LoginWithPhone() {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["container"]}>
        <div className={styles["content"]}>
          <WithPhoneLogin at={FormLocation.PAGE} />
        </div>
      </div>
    </div>
  );
}

export default LoginWithPhone;
