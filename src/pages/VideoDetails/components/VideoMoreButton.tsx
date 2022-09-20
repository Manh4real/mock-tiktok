import React from "react";
import clsx from "clsx";
import Tippy from "@tippyjs/react/headless";

// styles
import styles from "../VideoDetails.module.scss";

// icons
import { RiMoreLine } from "react-icons/ri";
import { FiFlag } from "react-icons/fi";

// components
import DeleteVideoButton from "./DeleteVideoButton";

// types
interface Props {
  byCurrentUser: boolean;
  videoId: number;
}

const VideoMoreButton = ({ byCurrentUser, videoId }: Props) => {
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
              {byCurrentUser ? (
                <DeleteVideoButton videoId={videoId} />
              ) : (
                <Report />
              )}
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

export default VideoMoreButton;
