import React, { useContext, useEffect } from "react";
import clsx from "clsx";

// icons
import { FiAlertTriangle } from "react-icons/fi";

// components
import CustomButton from "_/components/CustomButton";

// styles
import styles from "../LoginModal.module.scss";

// hoc
import withInputValidation from "./withInputValidation";

// context
import { Submit } from "../login/WithPhoneLogin";

// types
import { ValidationType } from "_/validation/Validation";
import { WithInputValidation } from "./withInputValidation";

interface Props extends WithInputValidation {}

function CodeInput({ errorMessage, hasError, isValid, inputProps }: Props) {
  const { isAllowed, setIsAllowed } = useContext(Submit);

  const handleSendCodeClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    setIsAllowed((prev) => ({
      ...prev,
      [ValidationType.CODE]: { value: inputProps.value, isValid },
    }));
  }, [isValid, setIsAllowed, inputProps.value]);

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
          disabled={!isAllowed.phone.isValid}
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
