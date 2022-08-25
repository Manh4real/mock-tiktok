import React, { useCallback, useEffect } from "react";

// styles
import styles from "./Post.module.scss";

// icons
import { Chat } from "_/components/icons";

// utils
import { numberCompact } from "_/utils";

// context
import { useCurrentVideo, useLoginContext } from "_/contexts";

// hoc
import withLoginModal, { WithLoginModal } from "_/hoc/withLoginModal";

// types
interface Props extends WithLoginModal {
  postId: number;
  commentsCount: number;
}

const CommentButton = ({ postId, commentsCount, showLoginModal }: Props) => {
  const { isLoggedIn } = useLoginContext();

  const {
    currentVideo: { postId: currentPostId },
  } = useCurrentVideo();

  const handleClick = useCallback(() => {
    if (!isLoggedIn) {
      showLoginModal();
      return;
    }
  }, [isLoggedIn, showLoginModal]);

  // dom events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!e) return;

      const eventTarget = e.target as HTMLElement;
      if (eventTarget.tagName === "INPUT") return;

      if (e.key.toLowerCase() !== "l") return;
      if (currentPostId !== postId) return;

      handleClick();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showLoginModal, isLoggedIn, currentPostId, postId, handleClick]);

  return (
    <button
      onClick={() => {
        showLoginModal();
      }}
    >
      <span className={styles["icon"]}>
        <Chat />
      </span>
      <span>{numberCompact(commentsCount)}</span>
    </button>
  );
};

export default React.memo(withLoginModal(CommentButton));
