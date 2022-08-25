import React from "react";

// styles
import styles from "./Login.module.scss";

// components
import ResetPassword from "_/components/LoginModal/login/ResetPassword";
import { FormLocation } from "_/components/LoginModal/types";

function ResetPasswordPage() {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["container"]}>
        <div className={styles["content"]}>
          <ResetPassword at={FormLocation.PAGE} />
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
