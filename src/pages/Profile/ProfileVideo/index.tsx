import clsx from "clsx";
import React, { useState } from "react";

// utils
import { numberCompact } from "_/utils";

// styles
import styles from "./ProfileVideo.module.scss";

// types
interface Props {
  src: string;
  poster: string;
  views: number;
}

const ProfileVideo = ({ src, poster, views }: Props) => {
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
        <svg
          width="18"
          height="18"
          viewBox="0 0 48 48"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 10.554V37.4459L38.1463 24L16 10.554ZM12 8.77702C12 6.43812 14.5577 4.99881 16.5569 6.21266L41.6301 21.4356C43.5542 22.6038 43.5542 25.3962 41.6301 26.5644L16.5569 41.7873C14.5577 43.0012 12 41.5619 12 39.223V8.77702Z"
          ></path>
        </svg>
        <span>{numberCompact(views)}</span>
      </div>
    </div>
  );
};

export default ProfileVideo;
