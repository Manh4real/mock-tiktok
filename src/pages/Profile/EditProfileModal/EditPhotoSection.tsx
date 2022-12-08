import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// styles
import styles from "./EditProfileModal.module.scss";

// icons
import { BsChevronLeft } from "react-icons/bs";
import CustomButton from "_/components/CustomButton";
import { useProgress } from "_/hooks";
import { FiAlertTriangle } from "react-icons/fi";

// types
interface Props {
  imageUrl: string;
  reset: () => void;
  cancelEditing: () => void;
  setEditedUrl: React.Dispatch<React.SetStateAction<string>>;
}
interface Position {
  x: number;
  y: number;
}
interface MouseDownPosition extends Position {}
interface InitialRect {
  offsetTop: number;
  offsetLeft: number;
  w: number;
  h: number;
}

const WIDTH = 360;
const HEIGHT = 360;

function EditPhotoSection({
  imageUrl,
  setEditedUrl,
  cancelEditing,
  reset,
}: Props) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // =================================================================
  const [hasMouseDown, setHasMouseDown] = useState(false);
  const initialRect = useRef<InitialRect>({
    offsetTop: 0,
    offsetLeft: 0,
    w: 0,
    h: 0,
  });
  const mouseDownPosition = useRef<MouseDownPosition>({
    x: 0,
    y: 0,
  });
  const previousTransform = useRef<Position>({ x: 0, y: 0 });

  const imageRef = useRef<HTMLImageElement>(null);
  const imageTransformRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  const transformImage = (offsetX: number, offsetY: number) => {
    if (!imageTransformRef.current) return;

    imageTransformRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  };
  // const scaleImage = (amount: number) => {
  //   if (!imageTransformRef.current) return;

  //   imageTransformRef.current.style.scale = `${amount}`;
  // };

  const handleLoaded = () => {
    previousTransform.current.x = 0;
    previousTransform.current.y = 0;

    imageTransformRef.current?.classList.remove(styles["mouseUp"]);
    transformImage(0, 0);

    // if (imageRef.current) {
    //   const w = imageRef.current.offsetWidth;
    //   const h = imageRef.current.offsetHeight;
    //   const aspect = w / h;

    //   if (aspect > 1) imageRef.current.height = HEIGHT;
    //   else if (aspect < 1) imageRef.current.width = WIDTH;
    //   else {
    //     imageRef.current.width = WIDTH;
    //     imageRef.current.height = HEIGHT;
    //   }
    // }

    initSize(imageRef);
    initSize(maskRef);
    setIsLoaded(true);

    function initSize(ref: React.RefObject<HTMLElement>) {
      if (ref.current) {
        const w = ref.current.offsetWidth;
        const h = ref.current.offsetHeight;
        const aspect = w / h;

        if (aspect > 1) ref.current.style.height = HEIGHT + "px";
        else if (aspect < 1) ref.current.style.width = WIDTH + "px";
        else {
          ref.current.style.width = WIDTH + "px";
          ref.current.style.height = HEIGHT + "px";
        }
      }
    }
    if (!imageTransformRef.current) return;

    if (maskRef.current) {
      const coords = imageTransformRef.current.getBoundingClientRect();
      const maskCoords = maskRef.current.getBoundingClientRect();

      initialRect.current.offsetTop = maskCoords.top - coords.top;
      initialRect.current.offsetLeft = maskCoords.left - coords.left;
      initialRect.current.w = coords.width;
      initialRect.current.h = coords.height;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setHasMouseDown(true);

    if (!imageTransformRef.current) return;
    imageTransformRef.current.classList.remove(styles["mouseUp"]);

    mouseDownPosition.current.x = e.clientX;
    mouseDownPosition.current.y = e.clientY;
  };

  useEffect(() => {
    let offsetX = 0;
    let offsetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();

      if (!hasMouseDown) return;

      const startOffsetTop = initialRect.current.offsetTop;
      const startOffsetLeft = initialRect.current.offsetLeft;
      const pivotX = startOffsetLeft + WIDTH / 3;
      const pivotY = startOffsetTop + HEIGHT / 3;

      offsetX =
        previousTransform.current.x + e.clientX - mouseDownPosition.current.x;
      offsetY =
        previousTransform.current.y + e.clientY - mouseDownPosition.current.y;

      if (offsetX <= -pivotX) {
        offsetX = -pivotX;
      } else if (offsetX >= pivotX) {
        offsetX = pivotX;
      }

      if (offsetY <= -pivotY) {
        offsetY = -pivotY;
      } else if (offsetY >= pivotY) {
        offsetY = pivotY;
      }

      transformImage(offsetX, offsetY);
    };

    const handleMouseUp = () => {
      if (!hasMouseDown) return;

      setHasMouseDown(false);

      if (!imageTransformRef.current) return;
      imageTransformRef.current.classList.add(styles["mouseUp"]);

      const startOffsetTop = initialRect.current.offsetTop; // top of the mask to top of the image
      const startOffsetLeft = initialRect.current.offsetLeft; // left of the mask to left of the image

      if (offsetX <= -startOffsetLeft) {
        offsetX = -startOffsetLeft;
      } else if (offsetX >= startOffsetLeft) {
        offsetX = startOffsetLeft;
      }

      if (offsetY <= -startOffsetTop) {
        offsetY = -startOffsetTop;
      } else if (offsetY >= startOffsetTop) {
        offsetY = startOffsetTop;
      }

      transformImage(offsetX, offsetY);

      previousTransform.current.x = offsetX;
      previousTransform.current.y = offsetY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [hasMouseDown]);
  // =================================================================
  // ZOOM
  const zoomBarRef = useRef<HTMLDivElement>(null);
  const {
    progress,
    handleMouseDown: handleZoomMouseDown,
    interactiveUpdateProgress,
  } = useProgress(zoomBarRef, {
    direction: "horizontal",
    initialValue: 0,
    target: 1,
    onChange: (progress) => {
      // const scaleAmount = Math.max(1 + progress, progress * 4);
      // const offsetLeft = (initialRect.current.w * (scaleAmount - 1)) / 2;
      // const offsetTop = (initialRect.current.h * (scaleAmount - 1)) / 2;
      // initialRect.current.offsetLeft += offsetLeft;
      // initialRect.current.offsetTop += offsetTop;
    },
  });

  const scaleAmount = Math.max(1 + progress, progress * 4);

  // =================================================================
  const handleCancel = () => {
    cancelEditing();
    reset();
  };
  const handleApply = () => {
    if (!imageRef.current || !maskRef.current) {
      cancelEditing();
      return;
    }
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const imageElement = imageRef.current;
    const maskElement = maskRef.current;
    const imageCoords = imageElement.getBoundingClientRect();
    const maskCoords = maskElement.getBoundingClientRect();

    // const w = imageElement.offsetWidth;
    // const h = imageElement.offsetHeight;
    // let aspect = w / h;

    // if (aspect < 1) aspect = h / w;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    const x = maskCoords.left - imageCoords.left;
    const y = maskCoords.top - imageCoords.top;
    // const x =
    //   initialRect.current.offsetLeft - previousTransform.current.x;
    // const y = initialRect.current.offsetTop - previousTransform.current.y;

    console.log({ x, y });

    if (ctx) {
      // clear canvas
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      // ⚠️🆘: Something go wrong
      ctx.drawImage(
        imageElement,
        x,
        y,
        WIDTH * 2,
        HEIGHT * 2,
        0,
        0,
        WIDTH,
        HEIGHT
      );
      canvas.toBlob((blob) => {
        if (!blob) return;

        const url = URL.createObjectURL(blob);

        // if (imageRef.current) imageRef.current.src = url;
        setEditedUrl(url);
      });
    }

    cancelEditing();
  };

  return (
    <div className={styles["editPhoto-container"]}>
      <header className={clsx(styles["editPhoto__title"], "flex-align-center")}>
        <span
          className={clsx(styles["editPhoto__back"], "flex-center")}
          onClick={handleCancel}
        >
          <BsChevronLeft />
        </span>
        Edit photo
        <small
          style={{ marginLeft: 20, fontSize: 16 }}
          className="flex-align-center"
        >
          <FiAlertTriangle color="orange" style={{ marginRight: 5 }} />
          On Experiment
        </small>
      </header>

      <main className={clsx(styles["editPhoto__main"], "flex-center")}>
        <div
          className={clsx(styles["editPhoto__transformArea"], "flex-center")}
        >
          <div
            ref={imageTransformRef}
            className={clsx(styles["editPhoto__transform"], "flex-center")}
            onMouseDown={handleMouseDown}
            style={{
              scale: `${scaleAmount}`,
            }}
          >
            <img
              ref={imageRef}
              src={imageUrl}
              alt="editing avatar"
              className={styles["editPhoto__photo"]}
              onLoad={handleLoaded}
            />
          </div>
          <div ref={maskRef} className={styles["editPhoto__mask"]}></div>
        </div>

        <div
          className={clsx(styles["editPhoto__zoom-container"], "flex-center")}
        >
          <span style={{ marginRight: 16 }}>Zoom</span>
          <div
            ref={zoomBarRef}
            onClick={(e: React.MouseEvent) => {
              interactiveUpdateProgress(e);
            }}
            onMouseDown={handleZoomMouseDown}
            className={styles["editPhoto__zoom"]}
          >
            <div
              className={styles["zoomTrack"]}
              style={{ width: `${progress * 100}%` }}
            ></div>
            <div
              className={styles["zoomTrackThumb"]}
              style={{ left: `${progress * 100}%` }}
            ></div>
          </div>
        </div>
      </main>

      <footer
        className={clsx(styles["editPhoto__footer"], "flex-align-center")}
      >
        <button
          className={clsx(
            "grey-outlined",
            styles["editPhoto__button"],
            styles["editPhoto__cancel"]
          )}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <CustomButton
          primary
          className={styles["editPhoto__button"]}
          onClick={handleApply}
          disabled={!isLoaded}
        >
          Apply
        </CustomButton>
      </footer>
    </div>
  );
}

export default EditPhotoSection;
