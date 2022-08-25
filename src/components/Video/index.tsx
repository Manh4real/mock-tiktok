import React, { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";

// icons
import { FaPlay } from "react-icons/fa";
import { Pause } from "_/components/icons";

// components
import Voice from "./Voice";
import VideoTime from "./VideoTime";

// hooks
// import { useElementOnScreen } from "_/hooks";

// styles
import styles from "./Video.module.scss";

// context
import { useCurrentVideo } from "_/contexts";

// types
import { VoiceRefObject, VideoTimeRefObject } from "./types";

interface AdditionalVideoProps {
  postId?: number;
  hasWindowHeight?: boolean;
  placeholder?: string;
}
type Props = React.VideoHTMLAttributes<HTMLVideoElement> & AdditionalVideoProps;

function Video(props: Props) {
  const { className, hasWindowHeight, postId, placeholder, ...otherProps } =
    props;

  const { currentVideo, handleVideoChange } = useCurrentVideo();

  const [isReady, setIsReady] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const voiceRef = useRef<VoiceRefObject>(null);
  const timeRef = useRef<VideoTimeRefObject>(null);

  // #region
  // ⚠️🆘 Experiment
  // const videoContainerRef = useRef<HTMLDivElement>(null);
  // const options = {
  //   root: null,
  //   rootMargin: "0px",
  //   threshold: 0.8,
  // };
  // const isVisibileOnScreen = useElementOnScreen(options, videoContainerRef);
  // #endregion

  // handling events
  const handlePlayClick = () => {
    if (!isReady) {
      setIsReady(true);
    }

    // change current videos info
    if (postId !== undefined && currentVideo.postId !== postId) {
      handleVideoChange(postId);
    }

    setPlaying((prev) => !prev);
  };

  const handleLoadedMetadata = () => {
    setActualVideoVolume(currentVideo.volume);
  };
  const handlePause = () => {
    setPlaying(false);
  };
  const handlePlay = () => {
    setPlaying(true);
  };
  const handleEnded = () => {
    // setPlaying(true);
  };
  const handleTimeUpdate = () => {
    timeRef.current?.handleTimeUpdate();
  };
  const handleVolumeChange = () => {
    voiceRef.current?.handleVolumeChange();
  };

  const play = useCallback(async () => {
    if (!isReady) return;

    try {
      await videoRef.current?.play();
    } catch (e: any) {
      console.log({ postId }, e.message);
    }
  }, [isReady, postId]);
  const pause = useCallback(() => {
    if (!isReady) return;

    try {
      videoRef.current?.pause();
    } catch (e: any) {
      console.log({ postId }, e.message);
    }
  }, [isReady, postId]);

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

  // ⚠️🆘  Experiment: play as if visible on screen
  // useEffect(() => {
  //   const timeID = setTimeout(() => {
  //     setIsReady(true);

  //     // change current videos info
  //     if (postId !== undefined) {
  //       handleVideoChange(postId);
  //     }

  //     setPlaying(true);
  //   }, 500);

  //   return () => clearTimeout(timeID);
  // }, [isVisibileOnScreen, handleVideoChange, postId]);

  // when switching videos
  useEffect(() => {
    if (currentVideo.postId !== postId) {
      setIsReady(false);
      setPlaying(false);
    }
  }, [currentVideo.postId, postId]);

  return (
    <div
      // ref={videoContainerRef}
      className={clsx(styles["container"], {
        [styles["has--windowHeight"]]: hasWindowHeight,
      })}
    >
      {isReady ? (
        <video
          {...otherProps}
          className={clsx(styles["video"], className)}
          ref={videoRef}
          poster={placeholder}
          muted={currentVideo.muted}
          loop={true}
          onPause={handlePause}
          onPlay={handlePlay}
          onEnded={handleEnded}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onVolumeChange={handleVolumeChange}
        />
      ) : (
        placeholder && (
          <img className={styles["placeholder"]} src={placeholder} alt="" />
        )
      )}

      <div className={styles["controller"]}>
        <div className={styles["buttons"]}>
          <div
            className={clsx(styles["play-icon"], styles["button"])}
            role="button"
            onClick={handlePlayClick}
          >
            {playing ? <Pause /> : <FaPlay fill="#fff" />}
          </div>
          <Voice
            ref={voiceRef}
            videoRef={videoRef}
            postId={postId !== undefined ? postId : -999}
            setActualVideoVolume={setActualVideoVolume}
          />
        </div>
        {isReady && <VideoTime ref={timeRef} videoRef={videoRef} />}
      </div>
    </div>
  );
}

export default Video;
