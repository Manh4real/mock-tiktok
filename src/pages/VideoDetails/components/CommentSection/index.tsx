import React, { useMemo } from "react";
import { Link } from "react-router-dom";

// styles
import styles from "./CommentSection.module.scss";

// icons
import { Spinner } from "_/components/icons";

// components
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import { useCommentCommand } from "_/contexts";

// config
import routes from "_/config/routes";

// Redux
import { useIsLoggedIn } from "_/features/currentUser/currentUserSlice";
import { useRedirectURL } from "_/hooks/useRedirect";

interface Props {
  video_uuid: string;
  videoId: number;
  isAllowed: boolean;
}

const CommentSection = (props: Props) => {
  const { isAllowed } = props;

  if (isAllowed) return <AllowedCommentSection {...props} />;

  return <div className={styles["comments"]}>Comments are turned off.</div>;
};

const AllowedCommentSection = ({
  video_uuid,
  videoId,
}: Omit<Props, "isAllowed">) => {
  const { comments, loading } = useCommentCommand();

  const isLoggedIn = useIsLoggedIn();

  const content = useMemo(() => {
    if (!isLoggedIn) return <Message />;
    else if (loading) return <Spinner />;
    else if (!loading && comments.length <= 0)
      return <strong style={{ fontWeight: "400" }}>No comments yet.</strong>;
    else if (!loading)
      return comments.map((comment) => {
        return <Comment key={comment.id} comment={comment} />;
      });
  }, [isLoggedIn, loading, comments]);

  return (
    <React.Fragment>
      <div className={styles["comments"]}>
        <div className={styles["container"]}>{content}</div>
      </div>
      <CommentInput videoId={videoId} video_uuid={video_uuid} />
    </React.Fragment>
  );
};

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

export default CommentSection;
