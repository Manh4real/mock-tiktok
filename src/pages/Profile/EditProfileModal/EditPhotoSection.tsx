import React, { useCallback, useEffect, useRef, useState } from "react";
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
interface PreviousTransform extends Position {
  scale: number;
}
interface InitialRect {
  top: number;
  left: number;
  offsetTop: number;
  offsetLeft: number;
  __TOP__: number;
  __LEFT__: number;
  __OFFSETTOP__: number;
  __OFFSETLEFT__: number;
  w: number;
  h: number;
}
type MaskRect = {
  top: number;
  left: number;
};

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
    top: 0,
    left: 0,
    offsetTop: 0, // top of the mask to top of the image
    offsetLeft: 0, // left of the mask to left of the image
    __TOP__: 0,
    __LEFT__: 0,
    __OFFSETTOP__: 0,
    __OFFSETLEFT__: 0,
    w: 0,
    h: 0,
  });
  const mouseDownPosition = useRef<Position>({
    x: 0,
    y: 0,
  });
  const transform = useRef<Position>({ x: 0, y: 0 });
  const previousTransform = useRef<PreviousTransform>({ x: 0, y: 0, scale: 1 });

  const maskRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const imageTransformRef = useRef<HTMLDivElement>(null);
  const maskRect = useRef<MaskRect>({ top: 0, left: 0 });

  const transformImage = useCallback((offsetX: number, offsetY: number) => {
    if (!imageTransformRef.current) return;

    imageTransformRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }, []);

  const transformImageWithContraint = useCallback(
    (
      currentHor: number,
      currentVer: number,
      maxHor: number,
      maxVer: number
    ) => {
      transform.current.x = currentHor;
      transform.current.y = currentVer;

      if (transform.current.x <= -maxHor) {
        transform.current.x = -maxHor;
      } else if (transform.current.x >= maxHor) {
        transform.current.x = maxHor;
      }

      if (transform.current.y <= -maxVer) {
        transform.current.y = -maxVer;
      } else if (transform.current.y >= maxVer) {
        transform.current.y = maxVer;
      }

      initialRect.current.top =
        initialRect.current.__TOP__ + transform.current.y;
      initialRect.current.left =
        initialRect.current.__LEFT__ + transform.current.x;

      transformImage(transform.current.x, transform.current.y);
    },
    [transformImage]
  );

  const handleLoaded = () => {
    previousTransform.current.x = 0;
    previousTransform.current.y = 0;
    previousTransform.current.scale = 1;

    imageTransformRef.current?.classList.remove(styles["removedTransition"]);
    transformImage(0, 0);

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

      maskRect.current.top = maskCoords.top;
      maskRect.current.left = maskCoords.left;
      initialRect.current.top = coords.top;
      initialRect.current.left = coords.left;
      initialRect.current.__TOP__ = initialRect.current.top;
      initialRect.current.__LEFT__ = initialRect.current.left;
      initialRect.current.__OFFSETLEFT__ = initialRect.current.offsetLeft;
      initialRect.current.__OFFSETTOP__ = initialRect.current.offsetTop;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setHasMouseDown(true);

    if (!imageTransformRef.current) return;
    imageTransformRef.current.classList.remove(styles["removedTransition"]);

    mouseDownPosition.current.x = e.clientX;
    mouseDownPosition.current.y = e.clientY;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();

      if (!hasMouseDown) return;

      const startOffsetTop = initialRect.current.offsetTop;
      const startOffsetLeft = initialRect.current.offsetLeft;

      // const pivotX = startOffsetLeft + WIDTH / 3;
      // const pivotY = startOffsetTop + HEIGHT / 3;
      const pivotX = startOffsetLeft;
      const pivotY = startOffsetTop;

      // starts to move at mousedown position
      const offsetX =
        previousTransform.current.x + e.clientX - mouseDownPosition.current.x;
      const offsetY =
        previousTransform.current.y + e.clientY - mouseDownPosition.current.y;

      transformImageWithContraint(offsetX, offsetY, pivotX, pivotY);
    };

    const handleMouseUp = () => {
      if (!hasMouseDown) return;

      if (!imageTransformRef.current) return;
      imageTransformRef.current.classList.add(styles["removedTransition"]);

      const startOffsetTop = initialRect.current.offsetTop;
      const startOffsetLeft = initialRect.current.offsetLeft;

      transformImageWithContraint(
        transform.current.x,
        transform.current.y,
        startOffsetLeft,
        startOffsetTop
      );

      previousTransform.current.x = transform.current.x;
      previousTransform.current.y = transform.current.y;

      setHasMouseDown(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [hasMouseDown, transformImageWithContraint]);
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
      const scaleAmount = Math.max(1 + progress, progress * 4);
      const extraWidth = ((scaleAmount - 1) * initialRect.current.w) / 2;
      const extraHeight = ((scaleAmount - 1) * initialRect.current.h) / 2;

      initialRect.current.offsetLeft =
        initialRect.current.__OFFSETLEFT__ + extraWidth;
      initialRect.current.offsetTop =
        initialRect.current.__OFFSETTOP__ + extraHeight;

      transformImageWithContraint(
        transform.current.x,
        transform.current.y,
        initialRect.current.offsetLeft,
        initialRect.current.offsetTop
      );

      console.log(initialRect.current);
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

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    const x = maskCoords.left - imageCoords.left;
    const y = maskCoords.top - imageCoords.top;

    console.log({ x, y });

    if (ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clear canvas

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
