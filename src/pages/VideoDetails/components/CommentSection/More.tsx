import React, { useMemo } from "react";
import clsx from "clsx";
import Tippy from "@tippyjs/react/headless";

// icons
import { RiMoreLine } from "react-icons/ri";
import { FiFlag } from "react-icons/fi";

// components
import DeleteCommentButton from "./DeleteCommentButton";

// styles
import defaultStyles from "./CommentSection.module.scss";

// Redux
import { useCurrentUserInfo } from "_/features/currentUser/currentUserSlice";

// types
interface Props {
  styles?: {
    readonly [index: string]: string;
  };
  authorId: number;
  commentId: number;
}

function More({ styles = defaultStyles, authorId, commentId }: Props) {
  const currentUserInfo = useCurrentUserInfo();

  const byCurrentUser = authorId === currentUserInfo?.id;

  const content = useMemo(() => {
    if (byCurrentUser) return <DeleteCommentButton commentId={commentId} />;
    else return <Report />;
  }, [byCurrentUser, commentId]);

  return (
    <div>
      <Tippy
        interactive
        placement="bottom-end"
        render={(attrs) => {
          return (
            <div {...attrs} className={styles["popup"]}>
              {content}
            </div>
          );
        }}
      >
        <div className={clsx("flex-center", styles["more"])}>
          <RiMoreLine />
        </div>
      </Tippy>
    </div>
  );
}

const Report = () => {
  return (
    <div
      role={"button"}
      className={clsx("button", "flex-align-center", defaultStyles["row"])}
    >
      <FiFlag size={24} />
      <span>Report</span>
    </div>
  );
};

export default More;
