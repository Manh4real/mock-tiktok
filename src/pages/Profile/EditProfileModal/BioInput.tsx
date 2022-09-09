import React, { useState, useEffect } from "react";
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

const BioInput = ({
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
  }, [isValid, setIsAllowed, inputProps.value, initialValue]);

  return (
    <>
      <textarea
        placeholder="Bio"
        name="bio"
        id=""
        spellCheck={false}
        autoComplete="off"
        className={clsx(styles["textArea"], {
          [styles["on--error"]]: inputProps.value !== "" && !isValid,
        })}
        {...inputProps}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          inputProps.onChange(e);

          //
          if (initialValue !== "") setInitialValue("");
        }}
        value={initialValue !== "" ? initialValue : inputProps.value}
      />
      <p
        className={clsx("small-font", {
          "error-message": inputProps.value !== "" && !isValid,
        })}
        style={{ marginTop: 5, fontSize: 12 }}
      >
        <span>
          {(initialValue !== "" ? initialValue : inputProps.value).length}
        </span>
        /80
      </p>
      {hasError && (
        <p className={clsx("error-message", "small-font")}>{errorMessage}</p>
      )}
    </>
  );
};

export default React.memo(withInputValidation(BioInput, ValidationType.BIO));
