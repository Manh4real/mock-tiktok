import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import clsx from "clsx";

// styles
import styles from "./Upload.module.scss";

// hooks
import { useProgress } from "_/hooks";

// context
import { FormFieldRefObject } from "_/contexts/submit/upload";
import { Spinner } from "_/components/icons";

interface Props {
  isVideo: boolean;
  videoFile: File | null;
  setIsAllowed: (value: number) => void;
  createNewDiscardObserver: (fieldRef: FormFieldRefObject) => void;
}

const IMAGES_NUM = 8;
const IMAGE_WIDTH = 84.2 * 10; // 1920
const IMAGE_HEIGHT = 150 * 10; // 1080
const timeIDs: NodeJS.Timeout[] = [];

const CoverNew = ({
  isVideo,
  videoFile,
  setIsAllowed,
  createNewDiscardObserver,
}: Props) => {
  const [images, setImages] = useState<string[]>([]);
  const [loadingImages, setLoadingImages] = useState<boolean>(false);

  let video = useRef(document.createElement("video")).current;
  const DOMVideo = useRef<HTMLVideoElement>(null);
  const DOMVideoSrc = useMemo(() => {
    if (!videoFile) return "";
    return URL.createObjectURL(videoFile);
  }, [videoFile]);
  const setDOMVideoCurrentTime = (value: number) => {
    if (!DOMVideo.current) return;
    DOMVideo.current.currentTime = value;
  };

  const dragProgressRef = useRef<HTMLDivElement>(null);
  const { handleMouseDown, progress, setProgress, interactiveUpdateProgress } =
    useProgress(dragProgressRef, {
      direction: "horizontal",
      initialValue: 0,
      target: 1,
      onChange: (progress) => {
        const duration = video.duration || 0;
        // Number.parseFloat((progress * duration).toFixed(3))
        setDOMVideoCurrentTime(Math.floor(progress * duration));
        setIsAllowed(Math.floor(progress * duration)); // API: thumbnail must be an integer of seconds
      },
    });

  useEffect(() => {
    if (!videoFile || !isVideo) return;

    let videoWidth = IMAGE_WIDTH;
    let videoHeight = IMAGE_HEIGHT;
    let canvas = document.createElement("canvas");

    video.src = URL.createObjectURL(videoFile);
    video.onloadedmetadata = () => {
      videoWidth = video.videoWidth;
      videoHeight = video.videoHeight;

      canvas.width = videoWidth;
      canvas.height = videoHeight;
    };

    let ctx = canvas.getContext("2d");
    let i = 0;

    const seekNext = () => {
      if (i >= IMAGES_NUM) {
        setLoadingImages(false);
        return;
      }

      const timeID = setTimeout(function () {
        video.currentTime = Math.floor((i * video.duration) / IMAGES_NUM);
        i++;
      }, 200);

      timeIDs.push(timeID);
    };

    const handleLoadStart = () => {
      setLoadingImages(true);
    };
    const handleLoadedMetadata = () => {
      seekNext();
    };
    const handleSeeked = function (this: HTMLVideoElement, ev: Event) {
      if (ctx) {
        ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
      }

      // const snapShot = canvas.toDataURL("image/jpeg");
      canvas.toBlob((blob) => {
        if (!blob) return;

        const snapShot = URL.createObjectURL(blob);

        seekNext();
        setImages((prev) => {
          if (prev.length >= IMAGES_NUM) return prev;

          return prev.concat(snapShot);
        });
      }, "image/jpeg");
    };

    video.addEventListener("loadstart", handleLoadStart);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("seeked", handleSeeked);

    return () => {
      timeIDs.forEach((timeID) => {
        clearTimeout(timeID);
      });

      video.removeEventListener("loadstart", handleLoadStart);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, [isVideo, video, videoFile]);

  //=====================================================
  const reset = useCallback(() => {
    setImages([]);
    setProgress(0);
    setLoadingImages(false);
  }, [setProgress]);

  // ====================================================
  useEffect(() => {
    if (!videoFile && (loadingImages || images.length > 0)) {
      reset();
    }
  }, [images.length, loadingImages, reset, videoFile]);

  //=====================================================
  useEffect(() => {
    createNewDiscardObserver({ reset });
  }, [createNewDiscardObserver, reset]);
  //=====================================================

  return (
    <div className={styles["form__field"]}>
      <div className={clsx(styles["form__title"])}>Cover</div>
      <div
        ref={dragProgressRef}
        onMouseDown={handleMouseDown}
        onClick={(e: React.MouseEvent) => {
          interactiveUpdateProgress(e);
        }}
        className={clsx(
          styles["form__cover-images"],
          styles["form__input-container"],
          {
            [styles["prepare"]]: loadingImages || images.length < IMAGES_NUM,
          }
        )}
      >
        {loadingImages ? (
          <Spinner style={{ marginLeft: 15 }} />
        ) : images.length < IMAGES_NUM ? (
          <div className={styles["form__cover-image"]}></div>
        ) : (
          <React.Fragment>
            <ImagesWithMemo images={images} />
            <div
              className={styles["form__cover--active"]}
              style={{ left: `${progress * 100}%` }}
            >
              <div className={styles["form__cover-image--active"]}>
                {videoFile && (
                  <video
                    ref={DOMVideo}
                    src={DOMVideoSrc}
                    preload="auto"
                    muted
                  />
                )}
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

//
interface ImagesProps {
  images: string[];
}

const Images = ({ images }: ImagesProps) => {
  return (
    <>
      {images.map((image, index) => {
        return (
          <div
            key={index}
            className={clsx("flex-center", styles["form__cover-image"])}
            aria-selected={false}
          >
            <img src={image} alt="uploaded-video-cover" />
          </div>
        );
      })}
    </>
  );
};
const ImagesWithMemo = React.memo(Images);

export default CoverNew;
