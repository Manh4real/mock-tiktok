import React, { useCallback, useContext, useMemo } from "react";

import { usePagesFetch } from "_/hooks";
import { getComments } from "_/services/comment";

// Redux
import { updateVideo } from "_/features/videos/videosSlice";
import { useAppDispatch } from "_/features/hooks";

// types
import { Comment } from "_/types";

interface ContextValue {
  comments: Comment[];
  commentsCount: number;
  loading: boolean;
  addComment: (comment: Comment) => void;
  deleteComment: (commentId: number) => void;
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
  addComment: () => {},
  deleteComment: () => {},
};

const Context = React.createContext<ContextValue>(initialValue);

const CommentCommandProvider = ({
  initialCommentsCount,
  videoId,
  video_uuid,
  children,
}: Props) => {
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
  } = usePagesFetch<Comment>(fetchComments, false, {});

  const dispatch = useAppDispatch();

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
    addComment: addNewComment,
    deleteComment,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

const useCommentCommand = () => {
  return useContext(Context);
};

export { useCommentCommand, CommentCommandProvider };
