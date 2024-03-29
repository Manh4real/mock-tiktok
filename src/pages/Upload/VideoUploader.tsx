import React, { useEffect } from "react";
import clsx from "clsx";

// icons
import { FiUploadCloud } from "react-icons/fi";
import { BiCheckCircle } from "react-icons/bi";

// styles
import styles from "./Upload.module.scss";
import { ValidationType } from "_/validation/Validation";

// components
import UploadVideo from "./UploadVideo";

// hoc
import { withFileValidation } from "_/hoc";

// context
import { FormFieldRefObject } from "_/contexts/submit/upload";

// types
import { WithFileValidation } from "_/hoc/types";
import { SubmitContext__InputProps } from "_/contexts/submit";

interface Props extends WithFileValidation, SubmitContext__InputProps<File> {
  createNewDiscardObserver: (fieldRef: FormFieldRefObject) => void;
}

const VideoUploader = ({
  isEmpty,
  isValid,
  inputProps,
  errorMessage,
  setIsAllowed,
  reset,
  createNewDiscardObserver,
  dragAndDropHandlers,
}: Props) => {
  const { url: videoUrl, file: videoFile } = inputProps;

  //=====================================================
  useEffect(() => {
    createNewDiscardObserver({
      reset: () => {
        reset();
        setIsAllowed({ isValid: false, value: null });
      },
    });
  }, [createNewDiscardObserver, reset, setIsAllowed]);
  //=====================================================

  //
  useEffect(() => {
    if (!videoFile) return;

    setIsAllowed({
      value: videoFile,
      isValid: videoUrl !== "" && isValid,
    });
  }, [setIsAllowed, videoFile, videoUrl, isValid]);

  return (
    <div className={styles["video-file-container"]}>
      {videoUrl && isValid ? (
        <div className={clsx("flex-center", styles["video-container"])}>
          <UploadVideo
            src={videoUrl}
            className={styles["video"]}
            autoPlay={true}
          />
          <VideoName
            content={videoFile.name}
            onClick={() => {
              reset();
              setIsAllowed({ isValid: false, value: null });
            }}
          />
        </div>
      ) : (
        <label
          htmlFor="uploadedVideo"
          className={clsx(styles["video-file-label"], {
            [styles["on--error"]]: !isEmpty && !isValid,
          })}
          onDrop={(e: React.DragEvent<HTMLLabelElement>) => {
            dragAndDropHandlers.handleDrop(e);
          }}
          onDragOver={(e: React.DragEvent<HTMLLabelElement>) => {
            dragAndDropHandlers.handleDragOver(e);
          }}
        >
          <div className={clsx("flex-center", styles["form__upload-icon"])}>
            <FiUploadCloud />
          </div>
          <strong
            style={{
              fontWeight: 500,
              fontSize: "18px",
              marginTop: "24px",
            }}
          >
            Select video to upload
          </strong>
          <p style={{ marginBlock: "4px 24px" }}>Or drag and drop a file</p>
          <p style={{ marginBottom: 6 }}>MP4 or WebM</p>
          <p style={{ marginBottom: 6 }}>720x1280 resolution or higher</p>
          <p style={{ marginBottom: 6 }}>Up to 10 minutes</p>
          <p style={{ marginBottom: 6 }}>Less than 2 GB</p>
          <div className={clsx("flex-center", styles["select-button"])}>
            Select file
          </div>

          <input
            type="file"
            name="uploadedVideo"
            id="uploadedVideo"
            onChange={inputProps.onChange}
            accept="video/*"
          />
        </label>
      )}

      {!isEmpty && !isValid && (
        <p
          className={clsx("error-message")}
          style={{
            position: "absolute",
            transform: "translateY(100%)",
            bottom: -20,
          }}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

//======================================================================
const VideoName = ({
  content,
  onClick,
}: {
  content: string;
  onClick: () => void;
}) => {
  return (
    <div className={clsx("flex-space-between", styles["video__title"])}>
      <div className={clsx("flex-align-center", "text-overflow-elipse")}>
        <span
          className={clsx("flex-center")}
          style={{ marginRight: 3, fontSize: 16, fill: "currentcolor" }}
        >
          <BiCheckCircle />
        </span>
        <span className={clsx("text-overflow-elipse")}>{content}</span>
      </div>
      <span
        className="hover-underlined"
        style={{
          fontWeight: 500,
          cursor: "pointer",
          whiteSpace: "nowrap",
          marginLeft: 10,
        }}
        onClick={() => {
          onClick();
        }}
      >
        Change video
      </span>
    </div>
  );
};

export default React.memo(
  withFileValidation(VideoUploader, ValidationType.VIDEO)
);
