import React from "react";

// components
import Modal from "_/components/Modal";

// styles
import styles from "./KeyboardModal.module.scss";

const KeyboardModal = React.forwardRef((_, ref) => {
  return (
    <Modal ref={ref}>
      <div className={styles["title"]}>Keyboard Shortcuts</div>
    </Modal>
  );
});

export default KeyboardModal;
