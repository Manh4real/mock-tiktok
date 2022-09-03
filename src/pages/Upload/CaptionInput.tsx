import React, { useEffect } from "react";
import clsx from "clsx";

// styles
import styles from "./Upload.module.scss";

// hoc
import { withInputValidation } from "_/hoc";

// contexts
import { useSubmit } from "_/contexts/submit/upload";

// types
import { WithInputValidation } from "_/hoc/types";
import { SubmitContext__InputProps } from "_/contexts/submit";
import { ValidationType } from "_/validation/Validation";

interface Props extends WithInputValidation, SubmitContext__InputProps {}

const CaptionInput = ({
  hasError,
  isEmpty,
  isValid,
  inputProps,
  errorMessage,
  reset,
  setIsAllowed,
}: Props) => {
  //=====================================================
  const { createNewDiscardObserver } = useSubmit();

  useEffect(() => {
    createNewDiscardObserver({ reset });
  }, [createNewDiscardObserver, reset]);
  //=====================================================

  //
  useEffect(() => {
    setIsAllowed({ value: inputProps.value, isValid });
  }, [isValid, setIsAllowed, inputProps.value]);

  return (
    <div className={styles["form__field"]}>
      <div className={clsx("flex-space-between", styles["form__title"])}>
        Caption
        <span
          className={clsx("grey-font", {
            "red-font": !isEmpty && !isValid,
          })}
          style={{ fontSize: 14, marginRight: 4 }}
        >
          {inputProps.value.length}/150
        </span>
      </div>
      <div
        className={clsx(
          styles["form__input-container"],
          styles["form__caption"],
          {
            [styles["on--error"]]: !isEmpty && !isValid,
          }
        )}
      >
        <input type="text" className={styles["form__input"]} {...inputProps} />
      </div>
      {hasError && <p className={clsx("error-message")}>{errorMessage}</p>}
    </div>
  );
};

export default withInputValidation(CaptionInput, ValidationType.CAPTION);
