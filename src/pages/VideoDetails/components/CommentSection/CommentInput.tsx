import React, { useState } from "react";
import clsx from "clsx";
import Tippy from "@tippyjs/react/headless";
import Picker from "emoji-picker-react";

// styles
import styles from "./CommentSection.module.scss";

// components
import { Spinner } from "_/components/icons";
import Tooltip from "_/components/Tooltip";

// icons
import { BiSmile } from "react-icons/bi";

// services
import { createNewComment as api_createNewComment } from "_/services/comment";

// contexts
import { useCommentCommand } from "_/contexts";

// hoc
import { withLoginModal } from "_/hoc";

// types
import { WithLoginModal } from "_/hoc/withLoginModal";

// Redux
import { useIsLoggedIn } from "_/features/currentUser/currentUserSlice";

interface Props extends WithLoginModal {
  video_uuid: string;
}

const CommentInput = ({ video_uuid, showLoginModal }: Props) => {
  const isLoggedIn = useIsLoggedIn();
  const { addComment: UI_addNewComment } = useCommentCommand();

  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handlePostComment = () => {
    if (!value) return;
    if (!isLoggedIn) {
      showLoginModal();
      return;
    }

    if (loading) return;

    setLoading(true);
    api_createNewComment(video_uuid, value)
      .then((result) => {
        setValue("");

        UI_addNewComment(result);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={clsx("flex-center", styles["add-comments"])}>
      <div className={clsx("flex-center", styles["comment-input-container"])}>
        <input
          type="text"
          className={styles["comment-input"]}
          placeholder="Add comment..."
          value={value}
          onChange={handleChange}
        />
        <EmojiInput setValue={setValue} />
      </div>
      <div
        role={"button"}
        className={clsx(styles["post-button"], {
          [styles["disabled"]]: value === "",
        })}
        onClick={handlePostComment}
      >
        {loading ? <Spinner style={{ width: 16, height: 16 }} /> : "Post"}
      </div>
    </div>
  );
};

// ============================================================================
const EmojiInput = ({
  setValue,
}: {
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <Tippy
      interactive
      visible={show}
      onClickOutside={() => {
        setShow(false);
      }}
      placement="top-start"
      render={(attrs) => {
        return (
          <div {...attrs} tabIndex={-1}>
            <Picker
              preload={true}
              onEmojiClick={(e, d) => {
                setValue((prev) => {
                  return prev + d.emoji;
                });
              }}
            />
          </div>
        );
      }}
    >
      <div className={styles["emoji-button-container"]}>
        <Tooltip title="Click to add emojis" placement={"top"}>
          <button
            className={clsx("flex-center", styles["emoji-button"])}
            onClick={() => {
              setShow((prev) => !prev);
            }}
          >
            <BiSmile />
          </button>
        </Tooltip>
      </div>
    </Tippy>
  );
};

export default React.memo(withLoginModal(CommentInput));
