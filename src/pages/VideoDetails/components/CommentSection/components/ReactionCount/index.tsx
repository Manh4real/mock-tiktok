import { useIsLoggedIn } from "_/features/currentUser/currentUserSlice";
import withLoginModal, { WithLoginModal } from "_/hoc/withLoginModal";
import { useLikeComment } from "_/hooks";
import clsx from "clsx";

import styles from "../../CommentSection.module.scss";
import More from "../../More";
import { FilledHeart, OutlinedHeart } from "_/components/icons";
import { numberCompact } from "_/utils";

interface ReactionsCountProps extends WithLoginModal {
  authorId: number;
  commentId: number;
  likes_count: number;
  isLiked: boolean;
  flexRow?: boolean;
}
const ReactionsCount = withLoginModal(
  ({
    authorId,
    commentId,
    likes_count,
    isLiked,
    showLoginModal,
    flexRow = false,
  }: ReactionsCountProps) => {
    const isLoggedIn = useIsLoggedIn();

    const [liked, toggle, likesCount] = useLikeComment(
      isLiked,
      commentId,
      likes_count
    );

    return (
      <div
        className={clsx(styles["reactions-count"], {
          [styles["is--liked"]]: liked,
          "flex-align-center": flexRow,
          "flex-row": flexRow,
        })}
      >
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

export default ReactionsCount;
