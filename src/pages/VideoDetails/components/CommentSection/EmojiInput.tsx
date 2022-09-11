import React, { useState } from "react";
import clsx from "clsx";
import Picker from "emoji-picker-react";
import Tippy from "@tippyjs/react/headless";

// icons
import { BiSmile } from "react-icons/bi";

// components
import Tooltip from "_/components/Tooltip";

// styles
import styles from "./CommentSection.module.scss";

interface EmojiInputProps {
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const EmojiInput = ({ setValue }: EmojiInputProps) => {
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
            <BiSmile size={24} />
          </button>
        </Tooltip>
      </div>
    </Tippy>
  );
};

export default EmojiInput;
