import React, { useState } from "react";
import clsx from "clsx";

// styles
import styles from "./CommentSection.module.scss";

// components
import { Spinner } from "_/components/icons";

// services
import { createNewComment as api_createNewComment } from "_/services/comment";

// contexts
import { useCommentCommand } from "_/contexts";
import { withLoginModal } from "_/hoc";

// types
import { WithLoginModal } from "_/hoc/withLoginModal";

// Redux
import { useIsLoggedIn } from "_/features/currentUser/currentUserSlice";

interface Props extends WithLoginModal {
  video_uuid: string;
}

const CommentInput = ({ video_uuid, showLoginModal }: Props) => {
  const isLoggedIn = useIsLoggedIn();
  const { addComment: UI_addNewComment } = useCommentCommand();

  const [loading, setLoading] = useState<boolean>(false);
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

    if (loading) return;

    setLoading(true);
    api_createNewComment(video_uuid, value)
      .then((result) => {
        setValue("");

        UI_addNewComment(result);
      })
      .finally(() => {
        setLoading(false);
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
        {loading ? <Spinner style={{ width: 16, height: 16 }} /> : "Post"}
      </div>
    </div>
  );
};

export default React.memo(withLoginModal(CommentInput));
