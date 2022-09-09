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

    const setFileInfo = (file: File) => {
      setURL(URL.createObjectURL(file));
      setFile(file);
      setIsValid(validate(file.name).isValid);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;

      setFileInfo(e.target.files[0]);
    };
    const handleDrop = <T extends HTMLElement>(e: React.DragEvent<T>) => {
      console.log("File(s) dropped");
      e.preventDefault();

      if (e.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        const items = Array.from(e.dataTransfer.items);

        // If more than 1 items, reject
        if (items.length > 1) return;

        const firstItem = items[0];

        // If dropped item isn't file, reject it
        if (firstItem.kind === "file") {
          const file = firstItem.getAsFile();

          if (file) setFileInfo(file);
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        const files = Array.from(e.dataTransfer.files);

        // If more than 1 file, reject
        if (files.length > 1) return;

        const firstFile = files[0];

        setFileInfo(firstFile);
      }
    };
    const handleDragOver = <T extends HTMLElement>(e: React.DragEvent<T>) => {
      console.log("File(s) in drop zone");
      e.preventDefault();
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
    const dragAndDropHandlers = {
      handleDrop,
      handleDragOver,
    };

    return (
      <WrappedComponent
        {...(props as T)}
        inputProps={inputProps}
        dragAndDropHandlers={dragAndDropHandlers}
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
