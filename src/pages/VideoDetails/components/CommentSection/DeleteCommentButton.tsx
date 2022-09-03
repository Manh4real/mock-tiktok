import React from "react";
import clsx from "clsx";

// icons
import { FiTrash2 } from "react-icons/fi";

// styles
import styles from "./CommentSection.module.scss";

// services
import { deleteComment as deleteCommentApi } from "_/services/comment";
import { useCommentCommand } from "_/contexts";

// types
interface Props {
  commentId: number;
}

const DeleteCommentButton = ({ commentId }: Props) => {
  const { deleteComment } = useCommentCommand();

  const handleClick = () => {
    const answer = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!answer) return;

    deleteCommentApi(commentId)
      .then(() => {
        deleteComment(commentId);
      })
      .catch(() => {
        alert("Cannot delete this comment.");
      });
  };

  return (
    <div
      role={"button"}
      className={clsx(
        "button",
        "flex-align-center",
        styles["delete-comment-button"],
        styles["row"]
      )}
      onClick={handleClick}
    >
      <FiTrash2 size={24} />
      <span>Delete</span>
    </div>
  );
};

export default DeleteCommentButton;
