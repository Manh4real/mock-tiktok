import React, {
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

// styles
import styles from "./Video.module.scss";

// utils
import { formatTime } from "_/utils";

// hooks
import { useProgress } from "_/hooks";

// types
import { VideoTimeRefObject } from "./types";

interface Props {
  videoRef: React.RefObject<HTMLVideoElement>;
}

const VideoTime = ({ videoRef }: Props, ref: React.Ref<VideoTimeRefObject>) => {
  const [shownTime, setShownTime] = useState<number>(0);

  const progressBarRef = useRef<HTMLDivElement>(null);

  const {
    hasMouseDown,
    handleMouseDown,
    progress,
    setProgress,
    interactiveUpdateProgress,
    current,
  } = useProgress(progressBarRef, {
    direction: "horizontal",
    initialValue: 0,
    target: videoRef.current?.duration || 0,
    onMouseUp: (hadMouseDownOnProgressBar) => {
      if (!hadMouseDownOnProgressBar) return;

      if (videoRef.current) {
        videoRef.current.currentTime = current;
      }
    },
    onMouseMove: () => {
      setShownTime(current);
    },
  });

  const handleTimeUpdate = useCallback(() => {
    if (hasMouseDown) return;

    if (videoRef.current) {
      setShownTime(videoRef.current.currentTime);
      setProgress(videoRef.current.currentTime / videoRef.current.duration);
    }
  }, [hasMouseDown, setProgress, videoRef]);

  //
  useImperativeHandle(
    ref,
    () => ({
      handleTimeUpdate,
    }),
    [handleTimeUpdate]
  );

  return (
    <div className={styles["time"]}>
      <div
        ref={progressBarRef}
        className={styles["progress-bar"]}
        onMouseDown={handleMouseDown}
        onClick={(e: React.MouseEvent) => {
          interactiveUpdateProgress(e, function (newProgress) {
            if (videoRef.current) {
              videoRef.current.currentTime =
                newProgress * videoRef.current.duration;
            }
          });
          setShownTime(current);
        }}
      >
        <div className={styles["currentTimeTrackContainer"]}>
          <div
            className={styles["currentTimeTrack"]}
            style={{ width: `${progress * 100}%` }}
          ></div>
        </div>
      </div>
      <div className={styles["time-num"]}>
        <span className={styles["current-time"]}>{formatTime(shownTime)}</span>
        <span style={{ marginInline: "2px" }}>/</span>
        <span className={styles["duration"]}>
          {formatTime(videoRef.current?.duration || 0)}
        </span>
      </div>
    </div>
  );
};

export default React.forwardRef(VideoTime);
