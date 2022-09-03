import React, { useEffect } from "react";
import clsx from "clsx";

// styles
import styles from "../LoginModal.module.scss";

// components
import { AlertIcon, InputErrorMessage } from "./components";

// hoc
import withInputValidation from "_/hoc/withInputValidation";

// types
import { ValidationType } from "_/validation/Validation";
import { WithInputValidation } from "_/hoc/types";
import { SubmitContext__InputProps } from "_/contexts/submit";

interface Props extends WithInputValidation, SubmitContext__InputProps {}

function PhoneInput({
  setIsAllowed,
  errorMessage,
  hasError,
  isValid,
  inputProps,
}: Props) {
  useEffect(() => {
    setIsAllowed({ value: inputProps.value, isValid });
  }, [isValid, setIsAllowed, inputProps.value]);

  return (
    <div>
      <div
        className={clsx(
          styles["row"],
          styles["form__input"],
          styles["form__phone-input"],
          {
            [styles["form__input--error"]]: hasError,
          }
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
        <div className={styles["input-container"]}>
          <input
            type="text"
            placeholder="Phone number"
            autoComplete="phone"
            name="phone"
            {...inputProps}
          />
          {hasError && <AlertIcon />}
        </div>
      </div>
      {hasError && <InputErrorMessage message={errorMessage} />}
    </div>
  );
}

export default withInputValidation(PhoneInput, ValidationType.PHONE);
