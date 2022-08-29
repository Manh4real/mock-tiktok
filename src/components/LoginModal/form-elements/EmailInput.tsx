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
import { AllowedInputProperty } from "_/contexts/submit";
import { WithInputValidation } from "_/hoc/types";

interface Props extends WithInputValidation {
  setIsAllowed: ({ value, isValid }: AllowedInputProperty) => void;
}

function EmailInput({
  isValid,
  errorMessage,
  hasError,
  inputProps,
  setIsAllowed,
}: Props) {
  useEffect(() => {
    setIsAllowed({ value: inputProps.value, isValid });
  }, [isValid, setIsAllowed, inputProps.value]);

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
