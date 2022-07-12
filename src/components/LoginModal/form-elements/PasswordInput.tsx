import React, { useState } from "react";
import clsx from "clsx";

// icons
import { Eye } from "_/components/icons";

// styles
import styles from "../LoginModal.module.scss";

function PasswordInput() {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  return (
    <div className={clsx(styles["row"], styles["form__input"])}>
      <input
        type={passwordVisible ? "text" : "password"}
        placeholder="Password"
      />
      <div
        className={styles["form__input-icon"]}
        onClick={() => setPasswordVisible((prev) => !prev)}
      >
        <Eye closed={!passwordVisible} />
      </div>
    </div>
  );
}

export default PasswordInput;
