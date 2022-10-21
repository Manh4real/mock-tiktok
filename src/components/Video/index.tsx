import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import clsx from "clsx";

// icons
import { FaPlay } from "react-icons/fa";
import { Pause, Spinner } from "_/components/icons";

// components
import Voice from "./Voice";
import VideoTime from "./VideoTime";

// styles
import styles from "./Video.module.scss";

// types
import { VoiceRefObject, VideoTimeRefObject } from "./types";
import { VideoRefObject } from "_/types";

// context
import { useCurrentVideo as useCurrentVideo_context } from "_/contexts";

// Redux
import {
  changeVideo,
  useCurrentVideo,
} from "_/features/currentVideo/currentVideoSlice";
import { useAppDispatch } from "_/features/hooks";

interface AdditionalVideoProps {
  postId?: number;
  hasWindowHeight?: boolean;
  placeholder?: string;
}
type Props = React.VideoHTMLAttributes<HTMLVideoElement> & AdditionalVideoProps;

function Video(props: Props, ref: React.Ref<VideoRefObject>) {
  const {
    className,
    hasWindowHeight,
    postId,
    placeholder,
    autoPlay: _autoplay = false,
    ...otherProps
  } = props;

  // Redux
  const currentVideo = useCurrentVideo();
  const dispatch = useAppDispatch();
  // ======================================================

  const { changeVideoRef } = useCurrentVideo_context();

  const [isReady, setIsReady] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [autoplay, setAutoplay] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(_autoplay);
  const [error, setError] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const voiceRef = useRef<VoiceRefObject>(null);
  const timeRef = useRef<VideoTimeRefObject>(null);

  // ======================================================
  const videoRefObject = useMemo(
    () => ({
      pause: () => {
        videoRef.current?.pause();
      },
      play: () => {
        if (!postId) return;

        if (currentVideo.postId === postId) return;

        dispatch(changeVideo({ postId }));
        changeVideoRef(videoRefObject);

        setIsReady(true);
        setPlaying(true);
      },
    }),
    [changeVideoRef, currentVideo.postId, dispatch, postId]
  );

  // handling events
  const handlePlayClick = () => {
    if (!isReady) {
      setIsReady(true);
    }

    // change current videos info
    if (
      postId !== undefined &&
      postId !== -999 &&
      currentVideo.postId !== postId
    ) {
      dispatch(changeVideo({ postId }));
      changeVideoRef(videoRefObject);
    }

    setPlaying((prev) => !prev);
  };

  const handleLoadStart = () => {
    setLoading(true);
  };
  const handleLoadedMetadata = () => {
    setLoading(false);
    setActualVideoVolume(currentVideo.volume);
  };
  const handleError = () => {
    setLoading(false);
    setError(true);
    alert("Can't load the video.");
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
    if (!isReady || error) return;

    try {
      await videoRef.current?.play();
    } catch (e: any) {
      console.log({ postId }, e.message);
    }
  }, [isReady, error, postId]);
  const pause = useCallback(() => {
    if (!isReady || error) return;

    try {
      videoRef.current?.pause();
    } catch (e: any) {
      console.log({ postId }, e.message);
    }
  }, [isReady, error, postId]);

  //
  const setActualVideoVolume = useCallback(
    (value: number) => {
      if (videoRef.current) {
        videoRef.current.volume = value;
      }
    },
    [videoRef]
  );

  // autoplay
  useEffect(() => {
    if (!_autoplay) return;

    const timeID = setTimeout(() => {
      setAutoplay(_autoplay);
    }, 600);

    return () => clearTimeout(timeID);
  }, [_autoplay]);

  useEffect(() => {
    if (autoplay) {
      setIsReady(true);
      setPlaying(true);
    }
  }, [autoplay]);

  // play / pause on click
  useEffect(() => {
    if (playing) play();
    else pause();
  }, [playing, play, pause]);

  // when switching videos
  useEffect(() => {
    if (!autoplay && postId !== -999 && currentVideo.postId !== postId) {
      setIsReady(false);
      setPlaying(false);
    }
  }, [autoplay, currentVideo.postId, postId]);

  useImperativeHandle(ref, () => videoRefObject);

  return (
    <div
      className={clsx(styles["container"], {
        [styles["has--windowHeight"]]: hasWindowHeight,
      })}
    >
      {isReady && !error ? (
        <video
          {...otherProps}
          className={clsx(styles["video"], className)}
          ref={videoRef}
          poster={placeholder}
          muted={currentVideo.muted}
          loop={true}
          autoPlay={autoplay}
          playsInline={autoplay}
          onPause={handlePause}
          onPlay={handlePlay}
          onEnded={handleEnded}
          onTimeUpdate={handleTimeUpdate}
          onLoadStart={handleLoadStart}
          onLoadedMetadata={handleLoadedMetadata}
          onError={handleError}
          onVolumeChange={handleVolumeChange}
        />
      ) : (
        placeholder && (
          <img className={styles["placeholder"]} src={placeholder} alt="" />
        )
      )}

      {loading && <Loading />}

      {!loading && !error && (
        <div className={styles["controller"]}>
          <div className={styles["buttons"]}>
            <div
              className={clsx(styles["play-button"], styles["button"])}
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
      )}
    </div>
  );
}

// =====================================================================
const Loading = () => {
  return (
    <div className={clsx("flex-center", styles["loading"])}>
      <Spinner style={{ width: "32px", height: "32px", color: "#fff" }} />
    </div>
  );
};

export default React.forwardRef(Video);
