import clsx from "clsx";
import { Link } from "react-router-dom";

// styles
import styles from "./CommentSection.module.scss";

// utils
import { fromNow } from "_/config/moment";

// components
import Image from "_/components/Image";
import AccountPopup from "_/components/AccountPopup";

// types
import { Comment as CommentInterface } from "_/types";

// Redux
import ReactionsCount from "./components/ReactionCount";

interface Props {
  authorId: number;
  comment: CommentInterface;
}
const Comment = ({ authorId, comment }: Props) => {
  const isCreator = authorId === comment.user.id;

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
            className={clsx(styles["commenter-link"])}
            to={`/@${comment.user.nickname}`}
          >
            <span className="hover-underlined">{comment.user.nickname}</span>
            {isCreator && (
              <span>
                <span style={{ marginInline: 5 }}>&middot;</span>
                <span className="pink-font" style={{ fontSize: 16 }}>
                  Creator
                </span>
              </span>
            )}
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

export default Comment;
