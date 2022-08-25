import React from "react";
import ReactDOM from "react-dom";

// components
import Video from "_/components/Video";

// icons
import { Close } from "_/components/icons";

// styles
import styles from "./PostDetails.module.scss";

// types
interface Props {
  postId: string;
}

function PostDetails({ postId }: Props) {
  return ReactDOM.createPortal(
    <div className={styles["container"]}>
      <div className={styles["left"]}>
        <div className={styles["video-container"]}>
          <Video
            src="../videos/Lil Baby x Gunna - Drip Too Hard.mp4"
            hasWindowHeight={true}
          />
        </div>
      </div>
      <div className={styles["right"]}>This is post: {postId}</div>
      <button className={styles["closeBtn"]}>
        <Close />
      </button>
    </div>,
    document.getElementById("modal-root") as Element
  );
}

export default React.forwardRef(PostDetails);
