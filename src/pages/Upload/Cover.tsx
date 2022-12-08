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
const IMAGE_WIDTH = 84.2 * 10; // 1920
const IMAGE_HEIGHT = 150 * 10; // 1080
const timeIDs: NodeJS.Timeout[] = [];

const savedCovers = new Map<string, string>();

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
        // Number.parseFloat((progress * duration).toFixed(3))
        video.currentTime = Math.floor(progress * duration);
        setIsAllowed(Math.floor(progress * duration)); // thumbnail must be an integer of seconds
      },
    });

  // ==========================================================================
  const coverRef = useRef<HTMLImageElement>(null);
  const img = useRef(new Image()).current;
  useEffect(() => {
    img.src = cover;
    const handleLoad = () => {
      if (coverRef.current) {
        coverRef.current.src = img.src;
      }
    };
    img.addEventListener("load", handleLoad);

    return () => img.removeEventListener("load", handleLoad);
  }, [cover, img]);
  // ==========================================================================

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
      const savedCover = savedCovers.get(this.currentTime.toFixed(3));
      const thisCurrentTime = this.currentTime.toFixed(3);
      console.log({ t: this.currentTime, savedCover });

      if (savedCover) {
        setCover(savedCover);
      }

      canvas.toBlob(
        (blob) => {
          if (!blob) return;

          const snapShot = URL.createObjectURL(blob);

          if (savedCover === undefined) {
            setCover((prev) => {
              if (!prev) return prev;

              savedCovers.set(thisCurrentTime, snapShot);
              return snapShot;
            });
          }

          seekNext();
          setImages((prev) => {
            if (prev.length >= IMAGES_NUM) return prev;

            return prev.concat(snapShot);
          });
        },
        "image/jpeg",
        0.15
      );
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
      savedCovers.set("0", images[0]);
    }
  }, [images, cover]);

  //=====================================================
  const reset = useCallback(() => {
    setImages([]);
    setCover("");
    setProgress(0);
    setLoadingImages(false);
    savedCovers.clear();

    console.log({ savedCovers });
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
          <>
            <ImagesWithMemo images={images} />
            <div
              className={styles["form__cover--active"]}
              style={{
                left: `clamp(7%, ${progress * 100}%, 93%)`,
                background: "black",
              }}
            >
              <div className={styles["form__cover-image--active"]}>
                {/* ref={coverRef} src={cover} */}
                <img ref={coverRef} alt="uploaded-video-cover" />
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
            <img src={image} alt="uploaded-video-cover" />
          </div>
        );
      })}
    </>
  );
};
const ImagesWithMemo = React.memo(Images);

export default Cover;
