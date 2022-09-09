import React, { useCallback, useMemo, useRef } from "react";

// styles
import styles from "./CommentSection.module.scss";

// icons
import { Spinner } from "_/components/icons";

// components
import Comment from "./Comment";
import CommentInput from "./CommentInput";

// hooks
import { usePagesFetch } from "_/hooks";

// services
import { getComments } from "_/services/comment";

// types
import { Comment as CommentInterface } from "_/types";
import { CommentCommandProvider } from "_/contexts";
import { Link } from "react-router-dom";
import routes from "_/config/routes";

// Redux
import { useIsLoggedIn } from "_/features/currentUser/currentUserSlice";
import { useRedirectURL } from "_/hooks/useRedirect";

interface Props {
  video_uuid: string;
  videoId: number;
}

const CommentSection = ({ video_uuid }: Props) => {
  const fetchComments = useCallback(
    (page?: number) => {
      return getComments(video_uuid);
    },
    [video_uuid]
  );

  const {
    loading,
    results: comments,
    setResults: setComments,
  } = usePagesFetch<CommentInterface>(fetchComments, false, {});

  const isLoggedIn = useIsLoggedIn();

  const sortedComments = useMemo(() => {
    return comments
      .slice(0)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
  }, [comments]);

  const addNewComment = useCallback(
    (comment: CommentInterface) => {
      setComments((prev) => [comment, ...prev]);
    },
    [setComments]
  );
  const deleteComment = useCallback(
    (commentId: number) => {
      setComments((prev) => {
        return prev.filter((cmt) => cmt.id !== commentId);
      });
    },
    [setComments]
  );

  const contextValue = useRef({
    commentsCount: comments.length,
    addComment: addNewComment,
    deleteComment,
  }).current;

  const content = useMemo(() => {
    if (!isLoggedIn) return <Message />;
    else if (loading) return <Spinner />;
    else if (!loading && sortedComments.length <= 0)
      return <strong style={{ fontWeight: "400" }}>No comments yet.</strong>;
    else if (!loading)
      return sortedComments.map((comment) => {
        return <Comment key={comment.id} comment={comment} />;
      });
  }, [isLoggedIn, loading, sortedComments]);

  return (
    <CommentCommandProvider value={contextValue}>
      <div className={styles["comments"]}>
        <div className={styles["container"]}>{content}</div>
      </div>

      <CommentInput video_uuid={video_uuid} />
    </CommentCommandProvider>
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
