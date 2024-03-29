import React from "react";
import clsx from "clsx";

// icons
import { FiTrash2 } from "react-icons/fi";

// styles
import styles from "./CommentSection.module.scss";

// services
import { deleteComment as api_deleteComment } from "_/services/comment";
import { useCommentCommandContext } from "_/contexts";

// Redux
import { useAppDispatch } from "_/features/hooks";
import { show } from "_/features/alert/alertSlice";

// types
interface Props {
  commentId: number;
}

const DeleteCommentButton = ({ commentId }: Props) => {
  const dispatch = useAppDispatch();

  const { deleteComment } = useCommentCommandContext();

  const handleClick = () => {
    const answer = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!answer) return;

    api_deleteComment(commentId)
      .then(() => {
        deleteComment(commentId);
      })
      .catch(() => {
        // alert("Cannot delete this comment.");
        dispatch(show({ message: "Cannot delete this comment." }));
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
