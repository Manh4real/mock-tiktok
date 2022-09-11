import React from "react";
import clsx from "clsx";
import { useNavigate } from "react-router";

// icons
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

// styles
import styles from "./VideoDetails.module.scss";

// hooks
import { useBackgroundLocation } from "_/hooks";

// Redux
import { useVideosIds } from "_/features/videos/videosSlice";
import { EntityId } from "@reduxjs/toolkit";

// types
interface Props {
  videoId: number;
}

const NavButtons = ({ videoId }: Props) => {
  const videosIds = useVideosIds();

  const currentVideoIndex = videosIds.findIndex((id) => videoId === id);
  const nextVideoId = videosIds[currentVideoIndex + 1];
  const prevVideoId = videosIds[currentVideoIndex - 1];

  const navigate = useNavigate();
  const { backgroundLocation } = useBackgroundLocation();

  const navigateTo = (id: number | EntityId) => {
    navigate("/video/" + id, {
      state: { background: backgroundLocation },
      replace: true,
    });
  };

  const handlePrevClick = () => {
    if (prevVideoId) {
      navigateTo(prevVideoId);
    }
  };
  const handleNextClick = () => {
    if (nextVideoId) {
      navigateTo(nextVideoId);
    }
  };

  return (
    <div className={styles["nav-buttons"]}>
      {prevVideoId !== undefined && (
        <div
          className={clsx("button", styles["basic-button"], styles["prev"])}
          onClick={handlePrevClick}
        >
          <BsChevronUp />
        </div>
      )}
      {nextVideoId !== undefined && (
        <div
          className={clsx("button", styles["basic-button"], styles["next"])}
          onClick={handleNextClick}
        >
          <BsChevronDown />
        </div>
      )}
    </div>
  );
};

export default NavButtons;
