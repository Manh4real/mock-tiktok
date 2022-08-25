import React, { useEffect } from "react";
import clsx from "clsx";

// icons
import { FiAlertTriangle } from "react-icons/fi";

// components
import CustomButton from "_/components/CustomButton";

// hoc
import withInputValidation from "_/hoc/withInputValidation";

// styles
import styles from "../LoginModal.module.scss";

// types
import { ValidationType } from "_/validation/Validation";
import { WithInputValidation } from "_/hoc/types";
import { AllowedInputProperty } from "_/contexts/submit";

interface Props extends WithInputValidation {
  disabled: boolean;
  setIsAllowed: ({ value, isValid }: AllowedInputProperty) => void;
}

function CodeInput({
  setIsAllowed,
  disabled,
  errorMessage,
  hasError,
  isValid,
  inputProps,
}: Props) {
  const handleSendCodeClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    setIsAllowed({ value: inputProps.value, isValid });
  }, [setIsAllowed, inputProps.value, isValid]);

  return (
    <div>
      <div
        className={clsx(
          styles["row"],
          styles["form__input"],
          styles["form__code-input"],
          {
            [styles["form__input--error"]]: hasError,
          }
        )}
      >
        <div className={styles["input-container"]}>
          <input type="text" placeholder="Enter 6-digit code" {...inputProps} />
          {hasError && (
            <div className={styles["input-alert-icon"]}>
              <FiAlertTriangle stroke="red" />
            </div>
          )}
        </div>
        <CustomButton
          type="button"
          onClick={handleSendCodeClick}
          className={styles["normal-button"]}
          // disabled={!isAllowed.phone.isValid}
          disabled={disabled}
        >
          Send code
        </CustomButton>
      </div>
      {hasError && (
        <p className={clsx(styles["row"], styles["input-error-message"])}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default withInputValidation(CodeInput, ValidationType.CODE);
