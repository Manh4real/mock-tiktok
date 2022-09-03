import clsx from "clsx";
import React, { useState } from "react";

// utils
import { numberCompact } from "_/utils";

// styles
import styles from "./ProfileVideo.module.scss";

// icons
import { OutlinedPlayIcon } from "_/components/icons";

// hooks
import { useNavigateToVideoDetails } from "_/hooks";

// types
interface Props {
  videoId: number;
  src: string;
  poster: string;
  views: number;
}

const ProfileVideo = ({ videoId, src, poster, views }: Props) => {
  const navigate = useNavigateToVideoDetails(videoId);

  const [hasMouseEnter, setHasMouseEnter] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setHasMouseEnter(true);
  };
  const handleMouseLeave = () => {
    setHasMouseEnter(false);
  };

  return (
    <div
      className={styles["container"]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={() => {
        navigate();
      }}
    >
      {hasMouseEnter && (
        <video
          className={styles["video"]}
          src={src}
          // poster={poster}
          autoPlay
          muted
          loop
        />
      )}
      <img
        className={clsx(styles["poster"], {
          [styles["hidden"]]: hasMouseEnter,
        })}
        src={poster}
        alt=""
      />

      <div className={clsx("flex-center", styles["views-count"])}>
        <OutlinedPlayIcon />
        <span>{numberCompact(views)}</span>
      </div>
    </div>
  );
};

export default React.memo(ProfileVideo);
