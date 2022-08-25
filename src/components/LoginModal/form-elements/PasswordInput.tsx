import React, { useEffect, useState } from "react";
import clsx from "clsx";

// icons
import { Eye } from "_/components/icons";

// styles
import styles from "../LoginModal.module.scss";
import { AlertIcon, InputErrorMessage } from "./components";

// hoc
import withInputValidation from "_/hoc/withInputValidation";

// types
import { ValidationType } from "_/validation/Validation";
import { WithInputValidation } from "_/hoc/types";
import { AllowedInputProperty } from "_/contexts/submit";

interface Props extends WithInputValidation {
  setIsAllowed: ({ value, isValid }: AllowedInputProperty) => void;
}

function PasswordInput({
  setIsAllowed,
  hasError,
  isValid,
  errorMessage,
  inputProps,
}: Props) {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

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
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            autoComplete="password"
            name="password"
            {...inputProps}
          />
          {hasError && <AlertIcon style={{ right: "30px" }} />}
        </div>
        <div
          className={styles["form__input-icon"]}
          onClick={() => setPasswordVisible((prev) => !prev)}
        >
          <Eye closed={!passwordVisible} />
        </div>
      </div>

      {hasError && (
        <InputErrorMessage
          message={
            <>
              <span
                style={{
                  color: "var(--black)",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                Your password must have: <br />
              </span>
              {errorMessage}
            </>
          }
        />
      )}
    </div>
  );
}

export default withInputValidation(PasswordInput, ValidationType.PASSWORD);
