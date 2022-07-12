import React from "react";
import clsx from "clsx";

// styles
import styles from "../LoginModal.module.scss";

function PhoneInput() {
  return (
    <div
      className={clsx(
        styles["row"],
        styles["form__input"],
        styles["form__phone-input"]
      )}
    >
      <select name="area" className={styles["form__select"]}>
        <option className={styles["form__option"]} value="VN">
          VN +84
        </option>
        <option className={styles["form__option"]} value="US">
          US +1
        </option>
        <option className={styles["form__option"]} value="IT">
          IT +39
        </option>
      </select>
      <span className={styles["form__delimiter"]}></span>
      <input type="text" placeholder="Phone number" />
    </div>
  );
}

export default PhoneInput;
