import React from "react";

// icons
import { KeyboardUp } from "_/components/icons";

// components
import Modal from "_/components/Modal";

// styles
import styles from "./KeyboardModal.module.scss";

// types
import { ModalRefObject } from "_/types";

const KeyboardModal = React.forwardRef((_, ref: React.Ref<ModalRefObject>) => {
  return (
    <Modal ref={ref}>
      <div className={styles["container"]}>
        <div className={styles["title"]}>Keyboard Shortcuts</div>
        <div className={styles["content"]}>
          <div className={styles["content-item"]}>
            <div className={styles["content-item__text"]}>
              Go to previous video
            </div>
            <div className={styles["content-item__icon"]}>
              <KeyboardUp />
            </div>
          </div>
          <div className={styles["content-item"]}>
            <div className={styles["content-item__text"]}>Go to next video</div>
            <div className={styles["content-item__icon"]}>
              <KeyboardUp style={{ transform: "rotate(180deg)" }} />
            </div>
          </div>
          <div className={styles["content-item"]}>
            <div className={styles["content-item__text"]}>Like video</div>
            <div
              className={styles["content-item__icon"]}
              data-content="L"
            ></div>
          </div>
          <div className={styles["content-item"]}>
            <div className={styles["content-item__text"]}>
              Mute / unmute video
            </div>
            <div
              className={styles["content-item__icon"]}
              data-content="M"
            ></div>
          </div>
        </div>
      </div>
    </Modal>
  );
});

export default KeyboardModal;
