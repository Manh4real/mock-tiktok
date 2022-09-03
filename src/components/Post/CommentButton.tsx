import React, { useCallback } from "react";

// icons
import { Chat } from "_/components/icons";

// utils
import { numberCompact } from "_/utils";

// context
import { useLoginContext } from "_/contexts";

// hoc
import withLoginModal, { WithLoginModal } from "_/hoc/withLoginModal";

// hooks
import { useNavigateToVideoDetails } from "_/hooks";

// types
interface Props extends WithLoginModal {
  styles: {
    readonly [key: string]: string;
  };
  disabled?: boolean;
  postId: number;
  commentsCount: number;
}

const CommentButton = ({
  disabled = false,
  styles,
  postId,
  commentsCount,
  showLoginModal,
}: Props) => {
  const { isLoggedIn } = useLoginContext();
  const navigate = useNavigateToVideoDetails(postId);

  const handleClick = useCallback(() => {
    if (!isLoggedIn) {
      showLoginModal();
      return;
    }
    if (disabled) return;
    navigate();
  }, [disabled, isLoggedIn, navigate, showLoginModal]);

  // dom events
  return (
    <button onClick={handleClick} disabled={disabled}>
      <span className={styles["icon"]}>
        <Chat />
      </span>
      <span>{numberCompact(commentsCount)}</span>
    </button>
  );
};

export default React.memo(withLoginModal(CommentButton));
