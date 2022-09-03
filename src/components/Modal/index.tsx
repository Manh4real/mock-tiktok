import React, { useEffect, useImperativeHandle, useState } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";

// icons
import { Close } from "_/components/icons";

// styles
import styles from "./Modal.module.scss";

// types
import { ModalRefObject } from "_/types";

// context
import { useModalContext } from "_/contexts";

interface Props {
  children: JSX.Element;
  noAnimation?: boolean;
  closeButtonStyle?: {
    [index: string]: number | string;
  };
  onHide?: () => void;
}

const Modal = React.forwardRef(
  (
    {
      closeButtonStyle,
      noAnimation = false,
      onHide = () => {},
      children,
    }: Props,
    ref: React.Ref<ModalRefObject>
  ) => {
    const { clearModal } = useModalContext();

    const [visible, setVisible] = useState<boolean>(true);

    // handling event functions
    const handleClose = (e: React.MouseEvent) => {
      e.stopPropagation();
      setVisible(false);
      document.body.style.overflow = "overlay";
      onHide();

      //
      clearModal();
    };
    const handleOpen = () => {
      setVisible(true);
      document.body.style.overflow = "hidden";
    };

    // supply functions to the parent
    useImperativeHandle(ref, () => ({
      handleOpen,
      handleClose,
    }));

    // dom event
    useEffect(() => {
      const handleCloseByKey = function (e: KeyboardEvent) {
        if (e.key === "Escape") {
          setVisible(false);
          document.body.style.overflow = "overlay";
          onHide();
        }
      };

      window.addEventListener("keydown", handleCloseByKey);

      return () => window.removeEventListener("keydown", handleCloseByKey);
    }, [onHide]);

    if (!visible) return <></>;

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
  }
);

export default Modal;
