import React from "react";
import clsx from "clsx";

// styles
import styles from "../LoginModal.module.scss";

function EmailInput() {
  return (
    <div className={clsx(styles["row"], styles["form__input"])}>
      <input type="text" placeholder="Email or username" />
    </div>
  );
}

export default EmailInput;
