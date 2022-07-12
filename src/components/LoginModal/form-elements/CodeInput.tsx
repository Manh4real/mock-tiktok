import React from "react";
import clsx from "clsx";

// styles
import styles from "../LoginModal.module.scss";

import CustomButton from "_/components/CustomButton";

function CodeInput() {
  return (
    <div
      className={clsx(
        styles["row"],
        styles["form__input"],
        styles["form__code-input"]
      )}
    >
      <input type="text" placeholder="Enter 6-digit code" />
      <CustomButton
        type="button"
        onClick={(e: React.MouseEvent) => e.preventDefault()}
        className={styles["normal-button"]}
      >
        Send code
      </CustomButton>
    </div>
  );
}

export default CodeInput;
