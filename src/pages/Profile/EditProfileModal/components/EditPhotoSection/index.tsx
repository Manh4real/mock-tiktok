import React, { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";

// styles
import styles from "../../EditProfileModal.module.scss";

// icons
import { BsChevronLeft } from "react-icons/bs";
import CustomButton from "_/components/CustomButton";
import { useProgress } from "_/hooks";
import { Transform, Position, Rect, InitialRect, Props } from "./types";
import { START_TRANSFORM, HEIGHT, WIDTH, CSS_UNIT } from "./constants";

function EditPhotoSection({
  imageUrl,
  setEdited,
  cancelEditing,
  reset,
}: Props) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  //#region - TRANSFORM
  // =================================================================
  const [hasMouseDown, setHasMouseDown] = useState(false);
  const mouseDownPosition = useRef<Position>({
    x: 0,
    y: 0,
  });
  const previousTransform = useRef<Transform>({ ...START_TRANSFORM });
  const transform = useRef<Transform>({ ...START_TRANSFORM });

  const maskRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const imageTransformRef = useRef<HTMLDivElement>(null);

  const maskRect = useRef<Rect>({ top: 0, left: 0 });
  const initialRect = useRef<InitialRect>({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const imageAspect = useRef<number>(1);

  const setImageSize = (scaleAmount: number = 1) => {
    if (!imageRef.current) return;

    imageRef.current.style.width =
      scaleAmount * initialRect.current.width + CSS_UNIT;
    imageRef.current.style.height =
      scaleAmount * initialRect.current.height + CSS_UNIT;
  };
  const transformImage = useCallback((offsetX: number, offsetY: number) => {
    if (!imageTransformRef.current) return;

    imageTransformRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }, []);
  const transformImageWithConstraint = useCallback(
    (
      extraTransformX: number,
      extraTransformY: number,
      offsetX: number = 0,
      offsetY: number = 0
    ) => {
      // scaled image size
      const extraWidth =
        ((transform.current.scale - 1) * initialRect.current.width) / 2;
      const extraHeight =
        ((transform.current.scale - 1) * initialRect.current.height) / 2;

      // additional
      const OFFSETY = offsetY;
      const OFFSETX = offsetX;

      const constraintY =
        maskRect.current.top - initialRect.current.top + extraHeight + OFFSETY;
      const constraintX =
        maskRect.current.left - initialRect.current.left + OFFSETX + extraWidth;

      transform.current.x = previousTransform.current.x + extraTransformX;
      transform.current.y = previousTransform.current.y + extraTransformY;

      // Y axis
      if (transform.current.y >= constraintY) {
        transform.current.top = maskRect.current.top + OFFSETY - extraHeight;

        transform.current.y = constraintY;
      } else if (transform.current.y < -constraintY) {
        transform.current.top =
          initialRect.current.top -
          (maskRect.current.top - initialRect.current.top) +
          extraHeight;

        transform.current.y = -constraintY;
      }

      // X axis
      if (transform.current.x >= constraintX) {
        transform.current.left = maskRect.current.left + OFFSETY - extraWidth;

        transform.current.x = constraintX;
      } else if (transform.current.x < -constraintX) {
        transform.current.left =
          initialRect.current.left -
          (maskRect.current.left - initialRect.current.left) +
          extraWidth;

        transform.current.x = -constraintX;
      }

      transform.current.top =
        initialRect.current.top - extraHeight + transform.current.y;
      transform.current.left =
        initialRect.current.left - extraWidth + transform.current.x;

      transformImage(transform.current.x, transform.current.y);
    },
    [transformImage]
  );

  const handleLoaded = () => {
    imageTransformRef.current?.classList.remove(styles["removedTransition"]);
    transformImage(0, 0);

    if (imageRef.current) {
      const w = imageRef.current.offsetWidth;
      const h = imageRef.current.offsetHeight;
      const aspect = w / h;

      if (aspect > 1) {
        imageRef.current.height = HEIGHT;
        imageRef.current.style.height = HEIGHT + CSS_UNIT;
        imageRef.current.style.width = "auto";
      } else if (aspect < 1) {
        imageRef.current.width = WIDTH;
        imageRef.current.style.width = WIDTH + CSS_UNIT;
        imageRef.current.style.height = "auto";
      } else {
        imageRef.current.width = WIDTH;
        imageRef.current.height = HEIGHT;

        imageRef.current.style.width = WIDTH + CSS_UNIT;
        imageRef.current.style.height = HEIGHT + CSS_UNIT;
      }

      // save how big image after adjust size (for the accuracy of cropping image)
      imageAspect.current = w / imageRef.current.width;
    }

    // initSize(imageRef);
    initSize(maskRef);
    setIsLoaded(true);

    function initSize(ref: React.RefObject<HTMLElement>) {
      if (ref.current) {
        const w = ref.current.offsetWidth;
        const h = ref.current.offsetHeight;
        const aspect = w / h;

        if (aspect > 1) {
          ref.current.style.height = HEIGHT + CSS_UNIT;
        } else if (aspect < 1) {
          ref.current.style.width = WIDTH + CSS_UNIT;
        } else {
          ref.current.style.width = WIDTH + CSS_UNIT;
          ref.current.style.height = HEIGHT + CSS_UNIT;
        }
      }
    }

    if (!imageTransformRef.current) return;

    if (maskRef.current) {
      const coords = imageTransformRef.current.getBoundingClientRect();
      const maskCoords = maskRef.current.getBoundingClientRect();

      // initialize rect
      initialRect.current.width = coords.width;
      initialRect.current.height = coords.height;
      initialRect.current.top = coords.top;
      initialRect.current.left = coords.left;

      maskRect.current.top = maskCoords.top;
      maskRect.current.left = maskCoords.left;

      transform.current.x = 0;
      transform.current.y = 0;
      transform.current.top = initialRect.current.top;
      transform.current.left = initialRect.current.left;

      previousTransform.current.x = 0;
      previousTransform.current.y = 0;
      previousTransform.current.top = transform.current.top;
      previousTransform.current.left = transform.current.left;
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

      const extraTransformX = e.clientX - mouseDownPosition.current.x;
      const extraTransformY = e.clientY - mouseDownPosition.current.y;

      transformImageWithConstraint(
        extraTransformX,
        extraTransformY,
        WIDTH / 3,
        HEIGHT / 3
      );
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!hasMouseDown) return;

      if (!imageTransformRef.current) return;
      imageTransformRef.current.classList.add(styles["removedTransition"]);

      // check conditions and transform back
      const extraTransformX = e.clientX - mouseDownPosition.current.x;
      const extraTransformY = e.clientY - mouseDownPosition.current.y;

      transformImageWithConstraint(extraTransformX, extraTransformY);

      // ends dragging, assigns previous transform
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
  }, [hasMouseDown, transformImage, transformImageWithConstraint]);
  //#endregion

  //#region - ZOOM
  // =================================================================
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

      setImageSize(scaleAmount);

      const prevScale = transform.current.scale;
      previousTransform.current.scale = prevScale;
      transform.current.scale = scaleAmount;

      const extraWidth =
        ((scaleAmount - prevScale) * initialRect.current.width) / 2;
      const extraHeight =
        ((scaleAmount - prevScale) * initialRect.current.height) / 2;

      transform.current.top -= extraHeight;
      transform.current.left -= extraWidth;

      transformImageWithConstraint(0, 0);

      previousTransform.current.x = transform.current.x;
      previousTransform.current.y = transform.current.y;
    },
  });
  //#endregion

  //#region - CROP
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

    const scaleAmount = Math.max(1 + progress, progress * 4);

    const width = (WIDTH * imageAspect.current) / scaleAmount;
    const height = (HEIGHT * imageAspect.current) / scaleAmount;

    canvas.width = width;
    canvas.height = height;

    const x = maskRect.current.left - transform.current.left;
    const y = maskRect.current.top - transform.current.top;

    if (ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clear canvas

      const sx = (x * imageAspect.current) / scaleAmount;
      const sy = (y * imageAspect.current) / scaleAmount;

      ctx.drawImage(imageElement, sx, sy, width, height, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        const file = new File([blob], "avatar", { type: "image/jpeg" });

        setEdited({ url, file });
      });
    }

    cancelEditing();
  };
  //#endregion

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
      </header>

      <main className={clsx(styles["editPhoto__main"])}>
        <div
          className={clsx(styles["editPhoto__transformArea"], "flex-center")}
        >
          <div
            ref={imageTransformRef}
            className={clsx(styles["editPhoto__transform"], "flex-center")}
            onMouseDown={handleMouseDown}
          >
            <img
              ref={imageRef}
              src={imageUrl}
              alt="editing avatar"
              className={styles["editPhoto__photo"]}
              onLoad={handleLoaded}
              id="sourceImage"
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
