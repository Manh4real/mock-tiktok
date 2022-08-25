import React, { useState } from "react";

// variables
import Validation from "_/validation/Validation";

// types
import { ValidationType } from "_/validation/Validation";
import { WithInputValidation } from "./types";

const validation = new Validation();

const withInputValidation = <
  T extends WithInputValidation = WithInputValidation
>(
  WrappedComponent: React.ComponentType<T>,
  validationType: ValidationType
) => {
  const ReturnedComponent = (props: Omit<T, keyof WithInputValidation>) => {
    const [value, setValue] = useState<string>("");

    const validate = (value: string) =>
      validation.validate(validationType, value);
    const validatingResult = validate(value);

    const [isValid, setIsValid] = useState<boolean>(validate(value).isValid);
    const [hasError, setHasError] = useState<boolean>(value !== "" && !isValid);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      setIsValid(validate(e.target.value).isValid);
    };
    const handleBlur: React.FocusEventHandler<HTMLInputElement> = () => {
      setHasError(value !== "" && !isValid);
    };
    const handleFocus: React.FocusEventHandler<HTMLInputElement> = () => {
      setHasError(false);
    };

    const otherProps = {
      hasError: hasError,
      isEmpty: value === "",
      isValid: isValid,
      errorMessage: validatingResult.errorMessage,
    };
    const inputProps = {
      value: value,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
    };

    return (
      <WrappedComponent
        {...(props as T)}
        inputProps={inputProps}
        {...otherProps}
      />
    );
  };

  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  ReturnedComponent.displayName = `withValidation(${displayName})`;

  return ReturnedComponent;
};

export default withInputValidation;
