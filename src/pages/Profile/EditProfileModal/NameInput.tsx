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

const NameInput = ({
  setIsAllowed,
  initialValue: _initialValue,
  isValid,
  hasError,
  errorMessage,
  inputProps,
}: Props) => {
  const [initialValue, setInitialValue] = useState<string>(
    _initialValue.trim()
  );

  //
  useEffect(() => {
    setIsAllowed({
      value: initialValue !== "" ? initialValue : inputProps.value,
      isValid: !(initialValue === "" && !isValid),
    });
  }, [isValid, setIsAllowed, inputProps.value, initialValue]);
  return (
    <>
      <input
        placeholder="Name"
        type="text"
        name="name"
        id=""
        spellCheck={false}
        autoComplete="off"
        className={styles["inputText"]}
        {...inputProps}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          inputProps.onChange(e);

          //
          if (initialValue !== "") setInitialValue("");
        }}
        value={initialValue !== "" ? initialValue : inputProps.value}
      />
      {hasError && (
        <p className={clsx("error-message", "small-font")}>{errorMessage}</p>
      )}
    </>
  );
};
export default React.memo(withInputValidation(NameInput, ValidationType.NAME));
