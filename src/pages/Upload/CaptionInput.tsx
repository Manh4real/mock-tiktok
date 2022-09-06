import React, { useEffect, useState } from "react";
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

interface Props extends WithInputValidation, SubmitContext__InputProps {
  value: string;
}

const CaptionInput = ({
  value: firstValue,
  hasError,
  isEmpty,
  isValid,
  inputProps,
  errorMessage,
  validate,
  setIsValid,
  reset,
  setIsAllowed,
}: Props) => {
  const [first, setFirst] = useState<boolean>(true);
  const caption = first ? firstValue : inputProps.value;

  //=====================================================
  const { createNewDiscardObserver } = useSubmit();

  useEffect(() => {
    createNewDiscardObserver({
      reset: () => {
        reset();
        setFirst(true);
        setIsAllowed({ isValid: false, value: "" });
      },
    });
  }, [createNewDiscardObserver, reset, setIsAllowed]);
  //=====================================================

  //
  useEffect(() => {
    if (first) setIsValid(validate(caption).isValid);
  }, [caption, setIsValid, first, validate]);
  //
  useEffect(() => {
    setIsAllowed({ value: caption, isValid });
  }, [isValid, setIsAllowed, caption]);

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
          {caption.length}/150
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
        <input
          type="text"
          className={styles["form__input"]}
          {...inputProps}
          value={caption}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            inputProps.onChange(e);

            if (first) setFirst(false);
          }}
        />
      </div>
      {hasError && <p className={clsx("error-message")}>{errorMessage}</p>}
    </div>
  );
};

export default withInputValidation(CaptionInput, ValidationType.CAPTION);
