import React, { useCallback, useContext, useMemo } from "react";

import { usePagesFetch } from "_/hooks";
import { getComments } from "_/services/comment";

// Redux
import { updateVideo } from "_/features/videos/videosSlice";
import { useAppDispatch } from "_/features/hooks";

// types
import { Comment } from "_/types";
import { setAccounts } from "_/features/accounts/accountsSlice";

interface ContextValue {
  comments: Comment[];
  commentsCount: number;
  loading: boolean;
  error: boolean;
  addComment: (comment: Comment) => void;
  deleteComment: (commentId: number) => void;
  reloadComments: () => void
}
interface Props {
  initialCommentsCount: number;
  videoId: number;
  video_uuid: string;
  children: React.ReactNode;
}

const initialValue: ContextValue = {
  comments: [],
  commentsCount: 0,
  loading: false,
  error: false,
  addComment: () => {},
  deleteComment: () => {},
  reloadComments: () => {}
};

const Context = React.createContext<ContextValue>(initialValue);

const CommentCommandProvider = ({
  initialCommentsCount,
  videoId,
  video_uuid,
  children,
}: Props) => {
  const dispatch = useAppDispatch();

  const fetchComments = useCallback(
    (page?: number) => {
      return getComments(video_uuid);
    },
    [video_uuid]
  );

  const {
    loading,
    error,
    results: comments,
    setResults: setComments,
    refetch
  } = usePagesFetch<Comment>(fetchComments, false, {
    onSuccess: useCallback(
      (result: Comment[]) => {
        dispatch(setAccounts(result.map((comment) => comment.user)));
      },
      [dispatch]
    ),
    errorMessage: "Can't load comments."
  });

  const sortedComments = useMemo(() => {
    return comments
      .slice(0)
      .sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
  }, [comments]);

  const addNewComment = useCallback(
    (comment: Comment) => {
      setComments((prev) => [comment, ...prev]);
      dispatch(
        updateVideo({
          id: videoId,
          changes: {
            comments_count: comments.length + 1,
          },
        })
      );
    },
    [comments.length, dispatch, setComments, videoId]
  );
  const deleteComment = useCallback(
    (commentId: number) => {
      setComments((prev) => {
        return prev.filter((cmt) => cmt.id !== commentId);
      });
      dispatch(
        updateVideo({
          id: videoId,
          changes: {
            comments_count: comments.length - 1,
          },
        })
      );
    },
    [comments.length, dispatch, setComments, videoId]
  );

  const contextValue = {
    comments: sortedComments,
    commentsCount:
      comments.length !== 0 ? comments.length : initialCommentsCount,
    loading,
    error,
    addComment: addNewComment,
    deleteComment,
    reloadComments: refetch
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

const useCommentCommandContext = () => {
  return useContext(Context);
};

export { useCommentCommandContext, CommentCommandProvider };
