import React, { useEffect, useImperativeHandle, useState } from "react";
import ReactDOM from "react-dom";
// components

// icons
import { Close } from "_/components/icons";

// styles
import styles from "./Modal.module.scss";

// types
interface Props {
  children: JSX.Element;
}

const Modal = React.forwardRef(({ children }: Props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);

  // handling event functions
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible(false);
  };
  const handleOpen = () => {
    setVisible(true);
  };
  const handleCloseByKey = function (e: KeyboardEvent) {
    if (e.key === "Escape") setVisible(false);
  };

  // supply functions to the parent
  useImperativeHandle(ref, () => ({
    handleOpen,
    handleClose,
  }));

  // dom event
  useEffect(() => {
    window.addEventListener("keydown", handleCloseByKey);

    return () => window.removeEventListener("keydown", handleCloseByKey);
  }, []);

  if (!visible) return <></>;

  return ReactDOM.createPortal(
    <div
      className={styles["modal-container"]}
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
    >
      <div className={styles["modal"]}>
        {children}
        <button className={styles["closeBtn"]} onClick={handleClose}>
          <Close />
        </button>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
});

export default Modal;
