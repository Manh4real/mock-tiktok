import React, { useEffect, useState } from "react";
import clsx from "clsx";

// styles
import styles from "./EditProfileModal.module.scss";

// hoc
import { withInputValidation } from "_/hoc";

// types
import { ValidationType } from "_/validation/Validation";
import { WithInputValidation } from "_/hoc/types";
import { SubmitContext__InputProps } from "_/contexts/submit";

interface Props extends WithInputValidation, SubmitContext__InputProps {
  initialValue: string;
}

const UsernameInput = ({
  setIsAllowed,
  initialValue: _initialValue,
  hasError,
  isValid,
  errorMessage,
  inputProps,
}: Props) => {
  const [initialValue, setInitialValue] = useState<string>(_initialValue);

  //
  useEffect(() => {
    setIsAllowed({
      value: initialValue !== "" ? initialValue : inputProps.value,
      isValid: !(initialValue === "" && !isValid),
    });
  }, [setIsAllowed, inputProps.value, initialValue, isValid]);
  return (
    <>
      <input
        placeholder="Username"
        type="text"
        name="username"
        id=""
        spellCheck={false}
        autoComplete="off"
        className={clsx(styles["inputText"], {
          [styles["on--error"]]: initialValue === "" && !isValid,
        })}
        {...inputProps}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          inputProps.onChange(e);

          //
          if (initialValue !== "") setInitialValue("");
        }}
        value={initialValue !== "" ? initialValue : inputProps.value}
      />
      {initialValue === "" && !isValid && errorMessage !== "" && (
        <p className={clsx("error-message", "small-font")}>{errorMessage}</p>
      )}
      <p className={clsx("small-font", styles["link-text"])}>
        www.tiktok.com/@{initialValue !== "" ? initialValue : inputProps.value}
      </p>
    </>
  );
};

export default withInputValidation(UsernameInput, ValidationType.USERNAME);
