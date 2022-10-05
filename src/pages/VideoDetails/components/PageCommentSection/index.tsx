import React, { useMemo } from "react";
import { Link } from "react-router-dom";

// icons
import { Spinner } from "_/components/icons";

// components
import Comment from "./Comment";
import CommentInput from "../CommentSection/CommentInput";
import { useCommentCommandContext } from "_/contexts";

// config
import routes from "_/config/routes";

// Redux
import { useIsLoggedIn } from "_/features/currentUser/currentUserSlice";
import { useRedirectURL } from "_/hooks/useRedirect";

// styles
import styles from "./PageCommentSection.module.scss";

interface Props {
  authorId: number;
  video_uuid: string;
  videoId: number;
  isAllowed: boolean;
}

function PageCommentSection({
  isAllowed,
  video_uuid,
  videoId,
  authorId,
}: Props) {
  const { comments, loading } = useCommentCommandContext();

  const isLoggedIn = useIsLoggedIn();

  const content = useMemo(() => {
    if (!isLoggedIn) return <Message />;
    else if (loading) return <Spinner />;
    else if (!loading && comments.length <= 0) {
      return <strong style={{ fontWeight: "400" }}>No comments yet.</strong>;
    } else if (!loading) {
      return comments.map((comment) => {
        return (
          <Comment key={comment.id} authorId={authorId} comment={comment} />
        );
      });
    }
  }, [isLoggedIn, loading, comments, authorId]);

  return (
    <React.Fragment>
      {isAllowed && <CommentInput videoId={videoId} video_uuid={video_uuid} />}
      {!isAllowed && (
        <div className={styles["comments"]} style={{ textAlign: "center" }}>
          Comments are turned off.
        </div>
      )}
      <div className={styles["comments"]}>
        <div className={styles["container"]}>{content}</div>
      </div>
    </React.Fragment>
  );
}

//=============================================================================
const Message = () => {
  const redirectUrlSearchParam = useRedirectURL();

  return (
    <p className={styles["message"]}>
      Want to comment? Please
      <Link to={routes.login + redirectUrlSearchParam}>Login</Link>
      or
      <Link to={routes.signup + redirectUrlSearchParam}>Signup</Link>
    </p>
  );
};

export default PageCommentSection;
