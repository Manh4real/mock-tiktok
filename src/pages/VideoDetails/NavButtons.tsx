import React from "react";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router";

// icons
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

// styles
import styles from "./VideoDetails.module.scss";

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
  const location = useLocation();
  const locationState = location.state as any;

  const navigateTo = (id: number | EntityId) => {
    navigate("/video/" + id, {
      state: { background: locationState?.background },
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
