import React, { useEffect, useState } from "react";
import clsx from "clsx";

// icons
import { AiOutlineEdit } from "react-icons/ai";

// components
import Image from "_/components/Image";

// styles
import styles from "./EditProfileModal.module.scss";

// hoc
import { withFileValidation } from "_/hoc";

// types
import { SubmitContext__InputProps } from "_/contexts/submit";
import { ValidationType } from "_/validation/Validation";
import { WithFileValidation } from "_/hoc/types";

interface Props extends WithFileValidation, SubmitContext__InputProps<File> {
  initialValue: string;
}

const PhotoFileInput = ({
  setIsAllowed,
  errorMessage,
  isValid,
  initialValue: _initialValue,
  inputProps,
}: Props) => {
  const [initialValue, setInitialValue] = useState<string>(_initialValue);

  const { file, url } = inputProps;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (initialValue !== "") setInitialValue("");

    inputProps.onChange(e);
  };

  //
  useEffect(() => {
    if (!file) return;

    setIsAllowed({
      value: file,
      isValid: !(initialValue === "" && !isValid),
    });
  }, [setIsAllowed, file, initialValue, isValid]);

  return (
    <>
      <label
        htmlFor="profile-photo"
        className={clsx("flex-center", styles["photo-file-label"])}
      >
        <div style={{ width: 96, position: "relative" }}>
          <Image
            className={clsx("circle")}
            src={initialValue || url}
            width="100%"
            height="100%"
          />
          <div
            className={clsx(
              "grey-outlined",
              "flex-center",
              styles["edit-icon"]
            )}
            style={{
              position: "absolute",
              width: 32,
              bottom: 0,
              right: 0,
              aspectRatio: "1",
              borderRadius: "50%",
            }}
          >
            <AiOutlineEdit />
          </div>
        </div>
      </label>
      <input
        type="file"
        name="profile-photo"
        id="profile-photo"
        accept="image/*"
        onChange={handleChange}

        // ⚠️ CAN'T SET VALUE FOR INPUT TYPE FILE (USER DECIDES)
        // value={initialValue !== "" ? initialValue : inputProps.value}
      />
      {initialValue === "" && !isValid && errorMessage !== "" && (
        <p className={clsx("error-message", "small-font")}>{errorMessage}</p>
      )}
    </>
  );
};

export default withFileValidation(PhotoFileInput, ValidationType.PHOTO);
