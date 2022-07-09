import React, { useImperativeHandle, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
// icons
import { BsChevronLeft } from "react-icons/bs";

// components
import CustomButton from "_/components/CustomButton";

// styles
import styles from "./Popper.module.scss";

// types
import { ModalRefObject, PopupMenuItem } from "_/types";
import { PopperRefObject } from "./";

interface PopupMenuChildren {
  title: string;
  content: PopupMenuItem[];
}
interface PopupProps {
  menu: PopupMenuItem[];
}
type History = PopupMenuChildren[];

const Popup = React.forwardRef(
  ({ menu }: PopupProps, ref: React.Ref<PopperRefObject>) => {
    // menu history
    const [history, setHistory] = useState<History>([
      { title: "", content: [...menu] },
    ]);
    // current shown menu
    const current = useMemo(() => history[history.length - 1], [history]);

    // ref
    const modalRef = useRef<ModalRefObject>(null);

    // functionalities on menu
    const onNext = (item: PopupMenuItem) => {
      if (item.children) {
        setHistory((prev) => {
          if (item.children) return [...prev, item.children];
          return prev;
        });
      }
    };
    const onBack = () => {
      if (history.length >= 1)
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    // supply functions for parent
    useImperativeHandle(ref, () => ({
      reset: () => {
        setHistory((prev) => prev.slice(0, 1));
      },
    }));

    return (
      <React.Fragment>
        {current && (
          <ul className={styles["menuPopupList"]}>
            {current.title && (
              <CustomButton
                className={styles["menu-popup__title"]}
                onClick={onBack}
              >
                <BsChevronLeft />
                {current.title}
              </CustomButton>
            )}
            <div
              className={clsx(styles["menu-popup__items"], {
                [styles["menu-popup__items--titled"]]: !!current.title,
              })}
            >
              {current.content.map((item, i) =>
                getItem(modalRef, item, onNext, i)
              )}
            </div>
          </ul>
        )}
      </React.Fragment>
    );
  }
);

function getItem(
  modalRef: React.RefObject<ModalRefObject>,
  current: PopupMenuItem,
  onNext: (item: PopupMenuItem) => void,
  i: number
) {
  // outer content
  let content: JSX.Element;

  // item props
  const props = {
    className: clsx(styles["menu-popup__item"], {
      [styles["delimited"]]: current.delimited,
    }),
  };

  // item inner content
  const itemContent = (
    <React.Fragment>
      {current.icon} {current.title}
    </React.Fragment>
  );

  if (current.to) {
    // is a link
    content = (
      <Link to={current.to} {...props}>
        {itemContent}
      </Link>
    );
  } else {
    // is a button

    // click event handler
    const handleClick = () => {
      if (current.children) onNext(current);
      if (current.modal) {
        modalRef.current?.handleOpen();
      }
    };

    // has modal
    let Modal;
    if (current.modal) Modal = current.modal;

    // content
    content = (
      <div {...props} onClick={handleClick}>
        {itemContent}
        {Modal && <Modal ref={modalRef} />}
      </div>
    );
  }

  return <li key={current.title}>{content}</li>;
}

export default Popup;
