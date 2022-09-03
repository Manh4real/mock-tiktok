import React, { useState } from "react";
import clsx from "clsx";

// styles
import styles from "./CommentSection.module.scss";

// services
import { createNewComment } from "_/services/comment";

// contexts
import { useLoginContext } from "_/contexts";
import { withLoginModal } from "_/hoc";

// types
import { WithLoginModal } from "_/hoc/withLoginModal";
import { Comment as CommentInterface } from "_/types";

interface Props extends WithLoginModal {
  video_uuid: string;
  addNewComment: (comment: CommentInterface) => void;
}

const CommentInput = ({ addNewComment, video_uuid, showLoginModal }: Props) => {
  const { isLoggedIn } = useLoginContext();

  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handlePostComment = () => {
    if (!value) return;
    if (!isLoggedIn) {
      showLoginModal();
      return;
    }

    createNewComment(video_uuid, value).then((result) => {
      setValue("");

      addNewComment(result);
    });
  };

  return (
    <div className={clsx("flex-center", styles["add-comments"])}>
      <div className={clsx("flex-center", styles["comment-input-container"])}>
        <input
          type="text"
          className={styles["comment-input"]}
          placeholder="Add comment..."
          value={value}
          onChange={handleChange}
        />
      </div>
      <div
        role={"button"}
        className={clsx(styles["post-button"], {
          [styles["disabled"]]: value === "",
        })}
        onClick={handlePostComment}
      >
        Post
      </div>
    </div>
  );
};

export default React.memo(withLoginModal(CommentInput));
