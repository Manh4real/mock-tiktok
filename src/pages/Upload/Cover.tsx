import React, { useCallback, useEffect, useRef, useState } from "react";
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
const timeIDs: NodeJS.Timeout[] = [];

const Cover = ({
  isVideo,
  videoFile,
  setIsAllowed,
  createNewDiscardObserver,
}: Props) => {
  const [images, setImages] = useState<string[]>([]);
  const [cover, setCover] = useState<string>("");
  const [loadingImages, setLoadingImages] = useState<boolean>(false);

  let video = useRef(document.createElement("video")).current;

  const dragProgressRef = useRef<HTMLDivElement>(null);
  const { handleMouseDown, progress, setProgress, interactiveUpdateProgress } =
    useProgress(dragProgressRef, {
      direction: "horizontal",
      initialValue: 0,
      target: 1,
      onChange: (progress) => {
        const duration = video.duration || 0;
        video.currentTime = Math.floor(progress * duration);
        setIsAllowed(Math.floor(progress * duration));
      },
    });

  // ====================================================
  useEffect(() => {
    if (!videoFile && (loadingImages || images.length > 0)) {
      setImages([]);
      setCover("");
      setProgress(0);
      setLoadingImages(false);
    }
  }, [images.length, loadingImages, setProgress, videoFile]);

  useEffect(() => {
    if (!videoFile || !isVideo) return;

    let canvas = document.createElement("canvas");
    video.src = URL.createObjectURL(videoFile);

    canvas.width = 1920;
    canvas.height = 1080;

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
      if (ctx) ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const snapShot = canvas.toDataURL("image/jpeg");

      seekNext();
      setImages((prev) => {
        if (prev.length >= IMAGES_NUM) return prev;

        return prev.concat(snapShot);
      });

      setCover((prev) => {
        if (!prev) return prev;

        return snapShot;
      });
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

  useEffect(() => {
    if (!cover && images.length >= IMAGES_NUM) {
      setCover(images[0]);
    }
  }, [images, cover]);

  //=====================================================
  const reset = useCallback(() => {
    setImages([]);
    setCover("");
    setProgress(0);
    setLoadingImages(false);
  }, [setProgress]);

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
          styles["form__input-container"]
        )}
      >
        {loadingImages ? (
          <Spinner />
        ) : images.length < IMAGES_NUM ? (
          <div className={styles["form__cover-image"]}></div>
        ) : (
          <>
            <ImagesWithMemo images={images} />
            <div
              className={styles["form__cover--active"]}
              style={{ left: `${progress * 100}%` }}
            >
              <div className={styles["form__cover-image--active"]}>
                <img
                  src={cover}
                  alt="uploaded-video-cover"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </>
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
            <img
              src={image}
              alt="uploaded-video-cover"
              width="100%"
              height="100%"
            />
          </div>
        );
      })}
    </>
  );
};
const ImagesWithMemo = React.memo(Images);

export default Cover;
