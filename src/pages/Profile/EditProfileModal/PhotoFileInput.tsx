import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";

// icons
import { AiOutlineEdit } from "react-icons/ai";

// components
import Image from "_/components/Image";
import EditPhotoSection from "./EditPhotoSection2";

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

interface Edited {
  url: string,
  file: File
}

const PhotoFileInput = ({
  setIsAllowed,
  errorMessage,
  isValid,
  initialValue: _initialValue,
  inputProps,
  isEmpty,
  reset: _reset,
}: Props) => {
  const [initialValue, setInitialValue] = useState<string>(_initialValue);

  const { file, url } = inputProps;

  // ⚠️====================================================================
  const [editing, setEditing] = useState<boolean>(false);
  const [edited, setEdited] = useState<Edited>({ url, file });

  const cancelEditing = useCallback(() => {
    setEditing(false);
  }, []);

  const reset = () => {
    _reset();
  };
  // ======================================================================

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (initialValue !== "") setInitialValue("");
    inputProps.onChange(e);
    setEditing(true);
    e.target.value = "";
  };

  //
  useEffect(() => {
    if (!file || !edited) return;

    let postFile: File = file;

    if(edited) {
      postFile = edited.file;
    }

    setIsAllowed({
      value: postFile,
      isValid: !(initialValue === "" && !isValid),
    });
  }, [setIsAllowed, file, initialValue, isValid, edited]);

  return (
    <React.Fragment>
      {editing &&
        ReactDOM.createPortal(
          <EditPhotoSection
            imageUrl={url}
            reset={reset}
            setEdited={setEdited}
            cancelEditing={cancelEditing}
          />,
          document.getElementById(styles["edit-photo"]) as HTMLElement
        )}
      <label
        htmlFor="profile-photo"
        className={clsx("flex-center", styles["photo-file-label"])}
      >
        <div style={{ width: 96, position: "relative" }}>
          <Image
            className={clsx("circle")}
            src={initialValue || edited.url}
            width="100%"
            height="100%"
            onLoad={() => {
              // no longer need to read the blob so it's revoked
              URL.revokeObjectURL(edited.url);
            }}
          />
          <div
            className={clsx(
              "grey-outlined",
              "flex-center",
              styles["edit-icon"]
            )}
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
      {initialValue === "" && !isEmpty && !isValid && errorMessage !== "" && (
        <p className={clsx("error-message", "small-font")}>{errorMessage}</p>
      )}
    </React.Fragment>
  );
};

export default React.memo(
  withFileValidation(PhotoFileInput, ValidationType.PHOTO)
);
