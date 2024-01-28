import React, { useImperativeHandle, useRef } from "react";

// styles
import styles from "./UploadVideo.module.scss";

// utils
import { formatTime } from "_/utils";

// hooks
import { useVideoTimeProgress } from "_/hooks";

// types
import { VideoTimeRefObject } from "./types";

interface Props {
  videoRef: React.RefObject<HTMLVideoElement>;
}

const VideoTime = ({ videoRef }: Props, ref: React.Ref<VideoTimeRefObject>) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const {
    handleMouseDown,
    handleTimeUpdate,
    handleClick,
    progress,
    resetTime,
    shownTime,
  } = useVideoTimeProgress(progressBarRef, videoRef);

  //
  useImperativeHandle(ref, () => ({ handleTimeUpdate, resetTime }), [
    handleTimeUpdate,
    resetTime,
  ]);

  return (
    <div
      className={styles["time"]}
      onDoubleClick={(e: React.MouseEvent) => {
        e.stopPropagation();
      }}
    >
      <div className={styles["time-num"]}>
        <span className={styles["current-time"]}>{formatTime(shownTime)}</span>
        <span style={{ marginInline: "2px" }}>/</span>
        <span className={styles["duration"]}>
          {formatTime(videoRef.current?.duration || 0)}
        </span>
      </div>
      <div
        ref={progressBarRef}
        className={styles["progress-bar"]}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
      >
        <div className={styles["currentTimeTrackContainer"]}>
          <div
            className={styles["currentTimeTrack"]}
            style={{ width: `${progress * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef(VideoTime);
