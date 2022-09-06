import React from "react";
import clsx from "clsx";
import Tippy from "@tippyjs/react/headless";

// styles
import styles from "../VideoDetails.module.scss";

// icons
import { RiMoreLine } from "react-icons/ri";

// components
import DeleteVideoButton from "./DeleteVideoButton";

// types
interface Props {
  videoId: number;
}

const VideoMoreButton = ({ videoId }: Props) => {
  return (
    <div
      style={{
        alignSelf: "flex-start",
      }}
    >
      <Tippy
        interactive
        placement="bottom-end"
        render={(attrs) => {
          return (
            <div {...attrs} className={styles["popup"]}>
              <DeleteVideoButton videoId={videoId} />
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
};

export default VideoMoreButton;
