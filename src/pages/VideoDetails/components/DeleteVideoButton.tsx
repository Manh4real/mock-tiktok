import React from "react";
import clsx from "clsx";

// icons
import { FiTrash2 } from "react-icons/fi";

// styles
import styles from "../VideoDetails.module.scss";

// services
import { deleteVideo } from "_/services/video";
import { useNavigate } from "react-router";

// types
interface Props {
  videoId: number;
}

const DeleteVideoButton = ({ videoId }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const answer = window.confirm(
      "Are you sure you want to delete this video?"
    );

    if (!answer) return;

    deleteVideo(videoId).then(() => {
      navigate(`/video/${videoId}`, { replace: true });

      document.body.style.overflow = "overlay";
    });
    // deleteCommentApi(commentId)
    //   .then(() => {
    //     deleteComment(commentId);
    //   })
    //   .catch(() => {
    //     alert("Cannot delete this comment.");
    //   });
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
