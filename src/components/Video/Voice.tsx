import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import clsx from "clsx";

// icons
import { Mute, Unmute } from "_/components/icons";

// styles
import styles from "./Video.module.scss";

// hooks
import { useProgress } from "_/hooks";

// types
import { VoiceRefObject } from "./types";

interface Props {
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
}

const Voice = ({ videoRef }: Props, ref: React.Ref<VoiceRefObject>) => {
  const [muted, setMuted] = useState<boolean>(false);

  const volumeTrackbarRef = useRef<HTMLDivElement>(null);

  const {
    handleMouseDown,
    hasMouseDown,
    progress: volume,
    updateProgress,
  } = useProgress(volumeTrackbarRef, {
    direction: "vertical",
    initialValue: 0.5,
    target: 1,
  });

  const handleVoice = () => {
    if (!muted) {
      if (videoRef.current) {
        videoRef.current.volume = 0;
        setMuted(true);
      }
    } else {
      if (videoRef.current) {
        videoRef.current.volume = volume;
        setMuted(false);
      }
    }
  };

  //
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;

      setMuted(volume === 0);
    }
  }, [volume, videoRef]);

  //
  useImperativeHandle(ref, () => ({
    muted,
  }));

  return (
    <div
      className={clsx(styles["voice"], styles["button"])}
      role="button"
      onClick={handleVoice}
    >
      {muted ? <Mute /> : <Unmute />}

      <div
        className={clsx(styles["volume"], {
          [styles["is--visible"]]: hasMouseDown,
        })}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();

          updateProgress(e);
        }}
        onMouseDown={handleMouseDown}
      >
        <div ref={volumeTrackbarRef} className={styles["volume-trackbar"]}>
          <div
            className={styles["currentVolume"]}
            style={{ height: `${muted ? 0 : volume * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef(Voice);
