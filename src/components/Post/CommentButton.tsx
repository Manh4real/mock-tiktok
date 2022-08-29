import React, { useCallback } from "react";

// styles
import styles from "./Post.module.scss";

// icons
import { Chat } from "_/components/icons";

// utils
import { numberCompact } from "_/utils";

// context
import { useLoginContext } from "_/contexts";

// hoc
import withLoginModal, { WithLoginModal } from "_/hoc/withLoginModal";

// types
interface Props extends WithLoginModal {
  postId: number;
  commentsCount: number;
}

const CommentButton = ({ postId, commentsCount, showLoginModal }: Props) => {
  const { isLoggedIn } = useLoginContext();

  const handleClick = useCallback(() => {
    if (!isLoggedIn) {
      showLoginModal();
      return;
    }
  }, [isLoggedIn, showLoginModal]);

  // dom events
  return (
    <button onClick={handleClick}>
      <span className={styles["icon"]}>
        <Chat />
      </span>
      <span>{numberCompact(commentsCount)}</span>
    </button>
  );
};

export default React.memo(withLoginModal(CommentButton));
