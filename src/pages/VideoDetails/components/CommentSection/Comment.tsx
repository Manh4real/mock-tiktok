import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

// styles
import styles from "./CommentSection.module.scss";

// utils
import { fromNow } from "_/config/moment";
import { numberCompact } from "_/utils";

// icons
import { OutlinedHeart, FilledHeart } from "_/components/icons";

// components
import Image from "_/components/Image";
import AccountPopup from "_/components/AccountPopup";
import More from "./More";

// hoc
import { withLoginModal } from "_/hoc";

// hooks
import { useLikeComment } from "_/hooks";

// types
import { Comment as CommentInterface } from "_/types";
import { WithLoginModal } from "_/hoc/withLoginModal";

// Redux
import { useIsLoggedIn } from "_/features/currentUser/currentUserSlice";

interface Props {
  comment: CommentInterface;
}
const Comment = ({ comment }: Props) => {
  return (
    <div className={clsx("flex-align-center", styles["comment"])}>
      <div className={styles["commenter-avatar"]}>
        <Image
          className={clsx("circle")}
          height={40}
          width={40}
          src={comment.user.avatar}
        />
      </div>
      <div className={styles["right-container"]}>
        <AccountPopup account={comment.user} offset={[-60, 30]}>
          <Link
            className={clsx("hover-underlined", styles["commenter-link"])}
            to={`/@${comment.user.nickname}`}
          >
            {comment.user.nickname}
          </Link>
        </AccountPopup>
        <p className={styles["comment__content"]}>{comment.comment}</p>
        <div className={clsx("grey-font", styles["subtitle"])}>
          <span>{fromNow(comment.created_at)}</span>
          <span role={"button"} className={styles["reply-button"]}>
            Reply
          </span>
        </div>
      </div>
      <ReactionsCount
        authorId={comment.user.id}
        commentId={comment.id}
        isLiked={comment.is_liked}
        likes_count={comment.likes_count}
      />
    </div>
  );
};

interface ReactionsCountProps extends WithLoginModal {
  authorId: number;
  commentId: number;
  likes_count: number;
  isLiked: boolean;
}
const ReactionsCount = withLoginModal(
  ({
    authorId,
    commentId,
    likes_count,
    isLiked,
    showLoginModal,
  }: ReactionsCountProps) => {
    // const { isLoggedIn } = useLoginContext();
    const isLoggedIn = useIsLoggedIn();

    const [liked, toggle, likesCount] = useLikeComment(
      isLiked,
      commentId,
      likes_count
    );

    return (
      <div className={styles["reactions-count"]}>
        <More commentId={commentId} authorId={authorId} />
        <div
          className={clsx("flex-center", styles["like-icon"])}
          onClick={() => {
            if (!isLoggedIn) {
              showLoginModal();
              return;
            }

            toggle();
          }}
        >
          {liked && <FilledHeart />}
          {!liked && <OutlinedHeart />}
        </div>
        <span>{numberCompact(likesCount)}</span>
      </div>
    );
  }
);

export default Comment;