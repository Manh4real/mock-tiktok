import React, { useEffect, useImperativeHandle, useRef } from "react";
import clsx from "clsx";

// icons
import { Mute, Unmute } from "_/components/icons";

// styles
import styles from "./DetailsPageVideo.module.scss";

// hooks
import { useProgress } from "_/hooks";

// types
import { VoiceRefObject } from "./types";

// Redux
import {
  setVolume,
  toggleMute,
  useCurrentVideo,
} from "_/features/currentVideo/currentVideoSlice";
import { useAppDispatch } from "_/features/hooks";

interface Props {
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  postId: number;
  setActualVideoVolume: (value: number) => void;
}

const Voice = (
  { setActualVideoVolume }: Props,
  ref: React.Ref<VoiceRefObject>
) => {
  const { muted, volume } = useCurrentVideo();
  const dispatch = useAppDispatch();

  const volumeTrackbarRef = useRef<HTMLDivElement>(null);

  // progress bar
  const {
    handleMouseDown,
    hasMouseDown,
    progress: changedVolume,
    setProgress,
    interactiveUpdateProgress,
  } = useProgress(volumeTrackbarRef, {
    direction: "vertical",
    initialValue: muted ? 0 : volume,
    target: 1,
    onChange: (newValue) => {
      setActualVideoVolume(newValue);

      dispatch(setVolume(newValue));
    },
  });

  // toggle mute/unmute video
  const handleVoice = () => {
    dispatch(toggleMute());
  };

  // ⚠️ may update later
  const handleVolumeChange = () => {
    // if (videoRef.current && !muted) {
    //   const currentChangedVolume = videoRef.current.volume;
    //   saveVolume(currentChangedVolume);
    //   setProgress(currentChangedVolume);
    //   setMute(currentChangedVolume === 0);
    // }
  };

  // set actual video volume
  useEffect(() => {
    if (muted) setActualVideoVolume(0);
    else setActualVideoVolume(volume);

    setProgress(muted ? 0 : volume);
  }, [muted, setActualVideoVolume, volume, setProgress]);

  //
  useImperativeHandle(ref, (): VoiceRefObject => ({ handleVolumeChange }));

  return (
    <div
      className={clsx(styles["voice"], styles["button"], {
        [styles["is--visible"]]: muted,
      })}
    >
      <div
        role="button"
        className={clsx(styles["mute-btn"], {
          [styles["has--mouseDown"]]: hasMouseDown,
        })}
        onClick={handleVoice}
      >
        {muted ? <Mute /> : <Unmute />}
      </div>
      <div
        className={clsx(styles["volume"], {
          [styles["is--visible"]]: hasMouseDown,
        })}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          interactiveUpdateProgress(e);
        }}
        onMouseDown={handleMouseDown}
      >
        <div ref={volumeTrackbarRef} className={styles["volume-trackbar"]}>
          <div
            className={styles["currentVolume"]}
            style={{ height: `${changedVolume * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef(Voice);
