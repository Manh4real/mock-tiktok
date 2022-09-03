import React, { useMemo } from "react";
import clsx from "clsx";
import Tippy from "@tippyjs/react/headless";

// icons
import { RiMoreLine } from "react-icons/ri";
import { FiFlag } from "react-icons/fi";

// components
import DeleteCommentButton from "./DeleteCommentButton";

// context
import { useLoginContext } from "_/contexts";

// styles
import styles from "./CommentSection.module.scss";

// types
interface Props {
  authorId: number;
  commentId: number;
}

function More({ authorId, commentId }: Props) {
  const { currentUser } = useLoginContext();

  const byCurrentUser = authorId === currentUser?.info.data.id;

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
      className={clsx("button", "flex-align-center", styles["row"])}
    >
      <FiFlag size={24} />
      <span>Report</span>
    </div>
  );
};

export default More;
