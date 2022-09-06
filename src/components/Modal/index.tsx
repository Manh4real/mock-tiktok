import React from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";

// icons
import { Close } from "_/components/icons";

// styles
import styles from "./Modal.module.scss";

import { ModalProps } from "_/types";

interface Props extends ModalProps {
  children: JSX.Element;
  noAnimation?: boolean;
  closeButtonStyle?: {
    [index: string]: number | string;
  };
}

const Modal = ({
  closeButtonStyle,
  noAnimation = false,
  handleClose,
  children,
}: Props) => {
  return ReactDOM.createPortal(
    <div
      className={styles["modal-container"]}
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
    >
      <div
        className={clsx(styles["modal"], {
          [styles["noAnimation"]]: noAnimation,
        })}
      >
        {children}
        <button
          className={styles["closeBtn"]}
          onClick={handleClose}
          style={closeButtonStyle}
        >
          <Close />
        </button>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
