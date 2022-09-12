import React from "react";
import clsx from "clsx";

// icons
import { FiTrash2 } from "react-icons/fi";

// styles
import styles from "../VideoDetails.module.scss";

// services
import { deleteVideo as api_deleteVideo } from "_/services/video";
import { useNavigate } from "react-router";

// Redux
import { deleteVideo as redux_deleteVideo } from "_/features/videos/videosSlice";
import { useAppDispatch } from "_/features/hooks";

// types
interface Props {
  videoId: number;
}

const DeleteVideoButton = ({ videoId }: Props) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleClick = () => {
    const answer = window.confirm(
      "Are you sure you want to delete this video?"
    );

    if (!answer) return;

    api_deleteVideo(videoId).then(() => {
      dispatch(redux_deleteVideo(videoId));

      navigate(`/video/${videoId}`, { replace: true });

      document.body.style.overflow = "overlay";
    });
  };

  return (
    <div
      role={"button"}
      className={clsx(
        "button",
        "flex-align-center",
        styles["delete-video-button"],
        styles["row"]
      )}
      onClick={handleClick}
    >
      <FiTrash2 size={24} />
      <span>Delete</span>
    </div>
  );
};

export default DeleteVideoButton;
