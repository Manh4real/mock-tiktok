import React, { useContext, useEffect } from "react";
import clsx from "clsx";

// styles
import styles from "../LoginModal.module.scss";

// components
import { AlertIcon, InputErrorMessage } from "./components";

// context
import { Submit } from "../login/WithPhoneLogin";

// hoc
import withInputValidation, {
  WithInputValidation, // type
} from "./withInputValidation";

// enum
import { ValidationType } from "_/validation/Validation";

interface Props extends WithInputValidation {}

function PhoneInput({ errorMessage, hasError, isValid, inputProps }: Props) {
  const { setIsAllowed } = useContext(Submit);

  useEffect(() => {
    setIsAllowed((prev) => ({
      ...prev,
      [ValidationType.PHONE]: { value: inputProps.value, isValid },
    }));
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
