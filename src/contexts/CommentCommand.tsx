import React, { useContext } from "react";
import { Comment } from "_/types";

interface ContextValue {
  addComment: (comment: Comment) => void;
  deleteComment: (commentId: number) => void;
}
interface Props {
  value: ContextValue;
  children: React.ReactNode;
}

const initialValue: ContextValue = {
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
