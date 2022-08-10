import React, { useRef, useState } from "react";
import clsx from "clsx";

// icons
import { FaPlay } from "react-icons/fa";
import { Pause } from "_/components/icons";

// components
import Voice from "./Voice";
import VideoTime from "./VideoTime";

// styles
import styles from "./Video.module.scss";

// types
import { VoiceRefObject, VideoTimeRefObject } from "./types";

interface Props extends React.VideoHTMLAttributes<HTMLVideoElement> {}

function Video(props: Props) {
  const { className } = props;
  const [playing, setPlaying] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const voiceRef = useRef<VoiceRefObject>(null);
  const timeRef = useRef<VideoTimeRefObject>(null);

  const handlePlayClick = () => {
    if (!playing) {
      videoRef.current?.play();
      setPlaying(true);
    } else {
      videoRef.current?.pause();
      setPlaying(false);
    }
  };

  const handlePause = () => {
    setPlaying(false);
  };
  const handlePlay = () => {
    setPlaying(true);
  };
  const handleEnded = () => {
    videoRef.current?.play();
    setPlaying(true);
  };
  const handleTimeUpdate = () => {
    timeRef.current?.handleTimeUpdate();
  };

  return (
    <div className={styles["container"]}>
      <video
        {...props}
        className={clsx(styles["video"], className)}
        ref={videoRef}
        muted={voiceRef.current?.muted}
        onPause={handlePause}
        onPlay={handlePlay}
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
      />

      <div className={styles["controller"]}>
        <div className={styles["buttons"]}>
          <div
            className={clsx(styles["play-icon"], styles["button"])}
            role="button"
            onClick={handlePlayClick}
          >
            {playing ? <Pause /> : <FaPlay fill="#fff" />}
          </div>
          <Voice ref={voiceRef} videoRef={videoRef} />
        </div>
        <VideoTime ref={timeRef} videoRef={videoRef} />
      </div>
    </div>
  );
}

export default Video;
