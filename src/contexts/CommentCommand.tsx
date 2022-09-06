import React, { useContext } from "react";
import { Comment } from "_/types";

interface ContextValue {
  commentsCount: number;
  addComment: (comment: Comment) => void;
  deleteComment: (commentId: number) => void;
}
interface Props {
  value: ContextValue;
  children: React.ReactNode;
}

const initialValue: ContextValue = {
  commentsCount: 0,
  addComment: () => {},
  deleteComment: () => {},
};

const Context = React.createContext<ContextValue>(initialValue);

const CommentCommandProvider = ({ value, children }: Props) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useCommentCommand = () => {
  return useContext(Context);
};

export { useCommentCommand, CommentCommandProvider };
