import React, { useImperativeHandle, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

// icons
import { BsChevronLeft } from "react-icons/bs";

// components
import CustomButton from "_/components/CustomButton";
import PopupItemModal from "./PopupItemModal";

// styles
import styles from "./Popper.module.scss";

// types
import { PopupMenuItem } from "_/types";
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
              {current.content.map((item, i) => getItem(item, onNext, i))}
            </div>
          </ul>
        )}
      </React.Fragment>
    );
  }
);

function getItem(
  current: PopupMenuItem,
  onNext: (item: PopupMenuItem) => void,
  i: number
) {
  // outer content
  let content: JSX.Element = <></>;

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
  } else if (current.modal) {
    // has modal
    content = (
      <PopupItemModal className={props.className} modal={current.modal}>
        {itemContent}
      </PopupItemModal>
    );
  } else {
    // is a button

    // click event handler
    const handleClick = () => {
      if (current.children) onNext(current);
    };

    // content
    content = (
      <div {...props} onClick={handleClick}>
        {itemContent}
      </div>
    );
  }

  return <li key={current.title}>{content}</li>;
}

export default Popup;
