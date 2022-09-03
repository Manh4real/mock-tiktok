import React, { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

// variables
import routes, { pagesTitle } from "_/config/routes";

// components
import CaptionInput from "./CaptionInput";
import VideoUploader from "./VideoUploader";
import ViewerAllowance from "./ViewerAllowance";
import ViewerPermission from "./ViewerPermission";

// services
import { uploadVideo } from "_/services/video";

// icons
import { Spinner } from "_/components/icons";

// styles
import styles from "./Upload.module.scss";

// context
import { SubmitProvider, useSubmit } from "_/contexts/submit/upload";

// types
import { ValidationType } from "_/validation/Validation";
import { AllowedInputProperty } from "_/contexts/submit";
import { Viewer, ViewerPermission as ViewerPermissionType } from "_/types";

function Upload() {
  // page title
  useEffect(() => {
    document.title = pagesTitle[routes.upload] as string;
  }, []);

  return (
    <SubmitProvider>
      <Form />
    </SubmitProvider>
  );
}

const Form = () => {
  const { discardEvent, setIsAllowed, isAllowed, isAllGood } = useSubmit();

  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDiscard = (e: React.MouseEvent) => {
    e.preventDefault();

    discardEvent.fired();
  };

  const handlePost = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!isAllGood) return;

    console.log("Posting...", isAllowed);

    if (isAllowed.video.value) {
      const body = {
        description: isAllowed.caption.value,
        upload_file: isAllowed.video.value,
        thumbnail_time: 5,
        viewable: isAllowed.viewable,
        "allows[]": isAllowed["allows[]"],
      };

      setLoading(true);

      uploadVideo(body)
        .then((data) => {
          alert("Video uploaded.");

          navigate("/@" + data.user.nickname, {
            replace: true,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  //=======================================================
  const setIsAllowed_video = useCallback(
    ({ value, isValid }: AllowedInputProperty<File>) => {
      setIsAllowed((prev) => ({
        ...prev,
        [ValidationType.VIDEO]: { value, isValid },
      }));
    },
    [setIsAllowed]
  );
  const setIsAllowed_caption = useCallback(
    ({ value, isValid }: AllowedInputProperty) => {
      setIsAllowed((prev) => ({
        ...prev,
        [ValidationType.CAPTION]: { value, isValid },
      }));
    },
    [setIsAllowed]
  );
  const setIsAllowed_viewer = useCallback(
    (value: Viewer) => {
      setIsAllowed((prev) => ({
        ...prev,
        viewable: value,
      }));
    },
    [setIsAllowed]
  );
  const setIsAllowed_permission = useCallback(
    (value: ViewerPermissionType) => {
      setIsAllowed((prev) => ({
        ...prev,
        "allows[]": value,
      }));
    },
    [setIsAllowed]
  );
  //=======================================================

  return (
    <div className={styles["container"]}>
      <div className={styles["content"]}>
        <header className={styles["header"]}>
          <h1 className={clsx(styles["header__title"])}>Upload video</h1>
          <h3 className={clsx("grey-font", styles["header__subtitle"])}>
            Post a video to your account
          </h3>
        </header>
        <div className={styles["form-container"]}>
          <form action="" className={styles["form"]}>
            <div className={styles["left"]}>
              <VideoUploader setIsAllowed={setIsAllowed_video} />
            </div>
            <div className={styles["right"]}>
              <CaptionInput setIsAllowed={setIsAllowed_caption} />
              <div className={styles["form__field"]}>
                <div className={clsx(styles["form__title"])}>Cover</div>
                <div
                  className={clsx(
                    styles["form__cover-images"],
                    styles["form__input-container"]
                  )}
                >
                  <div className={styles["form__cover-image"]}></div>
                </div>
              </div>
              <ViewerAllowance setIsAllowed={setIsAllowed_viewer} />
              <ViewerPermission setIsAllowed={setIsAllowed_permission} />
              <div className={styles["form__field"]}>
                <div
                  className={clsx("flex-align-center", styles["form__title"])}
                >
                  <span style={{ marginRight: 14 }}>Run a copyright check</span>
                  <input
                    type="checkbox"
                    name="copyright-check"
                    id="copyright-check"
                  />
                </div>
                <p
                  className={clsx("small-font")}
                  style={{ lineHeight: 1.8, marginTop: 6 }}
                >
                  We'll check your video for potential copyright infringements
                  on used sounds. If infringements are found, you can edit the
                  video before posting.
                  <a
                    href="/"
                    style={{ color: "var(--black)", fontWeight: 500 }}
                  >
                    Learn more
                  </a>
                </p>
              </div>
              <div
                className={clsx("flex-align-center", styles["form__buttons"])}
              >
                <button
                  type="button"
                  className={styles["form__discard-button"]}
                  onClick={handleDiscard}
                >
                  Discard
                </button>
                <button
                  disabled={!isAllGood}
                  className={styles["form__post-button"]}
                  onClick={handlePost}
                >
                  {loading ? <Spinner /> : "Post"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;
