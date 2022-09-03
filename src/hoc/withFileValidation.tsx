import React, { useCallback, useState } from "react";

// variables
import Validation from "_/validation/Validation";

// types
import { ValidationType } from "_/validation/Validation";
import { WithFileValidation } from "./types";

const validation = new Validation();

const withFileValidation = <T extends WithFileValidation = WithFileValidation>(
  WrappedComponent: React.ComponentType<T>,
  validationType: ValidationType
) => {
  const ReturnedComponent = (props: Omit<T, keyof WithFileValidation>) => {
    const [url, setURL] = useState<string>("");
    const [file, setFile] = useState<File>();

    const validate = (value: string) =>
      validation.validate(validationType, value);
    const validatingResult = validate(file?.name || "");

    const [isValid, setIsValid] = useState<boolean>(false);
    // const [hasError, setHasError] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;

      setURL(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
      setIsValid(validate(e.target.files[0].name).isValid);
    };
    const reset = useCallback(() => {
      setURL("");
      setFile(undefined);
      setIsValid(false);
    }, []);

    const otherProps = {
      isEmpty: url === "",
      isValid: isValid,
      errorMessage: validatingResult.errorMessage,
      reset: reset,
    };
    const inputProps = {
      url: url,
      file: file,
      onChange: handleChange,
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

export default withFileValidation;
