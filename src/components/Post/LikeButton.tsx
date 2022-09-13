import React, { useCallback, useEffect } from "react";
import clsx from "clsx";

// icons
import { BsFillHeartFill } from "react-icons/bs";

// utils
import { numberCompact } from "_/utils";

// context
import withLoginModal, { WithLoginModal } from "_/hoc/withLoginModal";

// hooks
// import { useLike } from "_/hooks";

// Redux
import { useIsLoggedIn } from "_/features/currentUser/currentUserSlice";
import { useCurrentVideo } from "_/features/currentVideo/currentVideoSlice";
import { useAppDispatch } from "_/features/hooks";
import { updateVideo } from "_/features/videos/videosSlice";

// services
import { dislikePost, likePost } from "_/services/post";

import { Video } from "_/types";

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
  const isLoggedIn = useIsLoggedIn();

  const { postId: currentPostId } = useCurrentVideo();

  // const { active, value, toggle } = useLike({ postId, isLiked, likesCount });
  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    if (!isLoggedIn) {
      showLoginModal();
      return;
    }

    // toggle();
    if (!isLiked) {
      likePost(postId)
        .then((video: Video) => {
          dispatch(
            updateVideo({
              id: postId,
              changes: {
                likes_count: video.likes_count,
                is_liked: video.is_liked,
              },
            })
          );
        })
        .catch(() => {
          alert("Can't like the video.");
        });
    } else {
      dislikePost(postId)
        .then((video: Video) => {
          dispatch(
            updateVideo({
              id: postId,
              changes: {
                likes_count: video.likes_count,
                is_liked: video.is_liked,
              },
            })
          );
        })
        .catch(() => {
          alert("Can't unlike the video.");
        });
    }
  }, [dispatch, isLiked, isLoggedIn, postId, showLoginModal]);

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
        {isLiked && isLoggedIn ? (
          <BsFillHeartFill className={styles["icon--active"]} fill="#FE2C55" />
        ) : (
          <BsFillHeartFill />
        )}
      </span>
      <span>{numberCompact(likesCount)}</span>
    </button>
  );
};

export default React.memo(withLoginModal(LikeButton));
