import React, { useCallback, useEffect, useState } from "react";
import clsx from "clsx";

// icons
import { BsFillHeartFill } from "react-icons/bs";

// utils
import { numberCompact } from "_/utils";

// context
import { useCurrentVideo, useLoginContext } from "_/contexts";

// services
import { dislikePost, likePost } from "_/services/post";
import withLoginModal, { WithLoginModal } from "_/hoc/withLoginModal";
import { Video } from "_/types";

// types
interface Props extends WithLoginModal {
  isLiked: boolean;
  styles: {
    readonly [key: string]: string;
  };
  postId: number;
  likesCount: number;
}

const LikeButton = ({
  isLiked,
  styles,
  postId,
  likesCount,
  showLoginModal,
}: Props) => {
  const { isLoggedIn } = useLoginContext();

  const {
    currentVideo: { postId: currentPostId },
  } = useCurrentVideo();

  const [value, setValue] = useState<number>(likesCount);
  const [active, setActive] = useState<boolean>(isLiked);

  const handleClick = useCallback(() => {
    if (!isLoggedIn) {
      showLoginModal();
      return;
    }

    //
    if (!active) {
      likePost(postId).then((video: Video) => {
        setValue(video.likes_count);
        setActive(video.is_liked);
      });
    } else {
      dislikePost(postId).then((video: Video) => {
        setValue(video.likes_count);
        setActive(video.is_liked);
      });
    }
  }, [active, isLoggedIn, postId, showLoginModal]);

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
    <button onClick={handleClick} className={clsx(styles["like-button"])}>
      <span className={styles["icon"]}>
        {active && isLoggedIn ? (
          <BsFillHeartFill className={styles["icon--active"]} fill="#FE2C55" />
        ) : (
          <BsFillHeartFill />
        )}
      </span>
      <span>{numberCompact(value)}</span>
    </button>
  );
};

export default React.memo(withLoginModal(LikeButton));
