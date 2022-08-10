import React from "react";
import clsx from "clsx";

// styles
import styles from "../LoginModal.module.scss";

// components
import { AlertIcon, InputErrorMessage } from "./components";

// hoc
import withInputValidation, {
  WithInputValidation, // type
} from "./withInputValidation";

// enum
import { ValidationType } from "_/validation/Validation";

interface Props extends WithInputValidation {}

function EmailInput({ errorMessage, hasError, inputProps, isValid }: Props) {
  return (
    <div>
      <div
        className={clsx(styles["row"], styles["form__input"], {
          [styles["form__input--error"]]: hasError,
        })}
      >
        <div className={styles["input-container"]}>
          <input
            type="text"
            placeholder="Email or username"
            autoComplete="email"
            name="email"
            {...inputProps}
          />

          {hasError && <AlertIcon />}
        </div>
      </div>

      {hasError && <InputErrorMessage message={errorMessage} />}
    </div>
  );
}

export default withInputValidation(EmailInput, ValidationType.EMAIL);
