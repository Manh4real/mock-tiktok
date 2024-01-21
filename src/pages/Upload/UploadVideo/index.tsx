import React, { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";

// icons
import { BiPlayCircle } from "react-icons/bi";
import { GiPauseButton } from "react-icons/gi";

// styles
import styles from "./UploadVideo.module.scss";

// components
import Voice from "./Voice";
import VideoTime from "./VideoTime";

// types
import { VoiceRefObject, VideoTimeRefObject } from "./types";
import { useAppDispatch } from "_/features/hooks";
import { show } from "_/features/alert/alertSlice";

interface AdditionalVideoProps {
  placeholder?: string;
}
type Props = React.VideoHTMLAttributes<HTMLVideoElement> & AdditionalVideoProps;

function UploadVideo(props: Props) {
  const { className, placeholder, autoPlay = false, ...otherProps } = props;

  const [playing, setPlaying] = useState<boolean>(autoPlay);

  const videoRef = useRef<HTMLVideoElement>(null);
  const voiceRef = useRef<VoiceRefObject>(null);
  const timeRef = useRef<VideoTimeRefObject>(null);

  const dispatch = useAppDispatch();
  // handling events
  const handlePlayClick = () => {
    setPlaying((prev) => !prev);
  };

  const handleTimeUpdate = () => {
    timeRef.current?.handleTimeUpdate();
  };

  const play = useCallback(async () => {
    try {
      await videoRef.current?.play();
    } catch (e: any) {
      dispatch(show({ message: "Upload Video Error:" + e.message }));
      throw e;
    }
  }, []);
  const pause = useCallback(() => {
    try {
      videoRef.current?.pause();
    } catch (e: any) {
      dispatch(show({ message: "Upload Video Error:" + e.message }));
      throw e;
    }
  }, []);

  //
  const setActualVideoVolume = useCallback(
    (value: number) => {
      if (videoRef.current) {
        videoRef.current.volume = value;
      }
    },
    [videoRef]
  );

  // play / pause on click
  useEffect(() => {
    if (playing) play();
    else pause();
  }, [playing, play, pause]);

  return (
    <div className={clsx(styles["container"])}>
      <video
        {...otherProps}
        className={clsx(styles["video"], className)}
        ref={videoRef}
        poster={placeholder}
        muted={!!voiceRef.current?.muted}
        loop={true}
        autoPlay={autoPlay}
        onTimeUpdate={handleTimeUpdate}
      />

      <div className={styles["controller"]}>
        <div className={styles["buttons"]}>
          <div
            className={clsx(styles["play-icon"], styles["button"])}
            role="button"
            onClick={handlePlayClick}
          >
            {playing ? <GiPauseButton size={12} /> : <BiPlayCircle />}
          </div>
          <Voice ref={voiceRef} setActualVideoVolume={setActualVideoVolume} />
        </div>
        <VideoTime ref={timeRef} videoRef={videoRef} />
      </div>
    </div>
  );
}

export default UploadVideo;
