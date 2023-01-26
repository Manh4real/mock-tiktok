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
import { PopperRefObject } from "./index";

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
              <BackButton onBack={onBack} title={current.title} />
            )}
            <div
              className={clsx(styles["menu-popup__items"], {
                [styles["menu-popup__items--titled"]]: !!current.title,
              })}
            >
              {current.content.map((item, i) => {
                return <Item key={i} current={item} onNext={onNext} />
              })}
            </div>
          </ul>
        )}
      </React.Fragment>
    );
  }
);

interface ItemProps {
  current: PopupMenuItem,
  onNext: (item: PopupMenuItem) => void
}

const Item = ({ current, onNext }: ItemProps) => {
  // outer content
  const content = useMemo(() => {
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
      return (
        <Link to={current.to} {...props}>
          {itemContent}
        </Link>
      );
    } else if (current.modal) {
      // has modal
      return (
        <PopupItemModal className={props.className} modal={current.modal}>
          {itemContent}
        </PopupItemModal>
      );
    } else {
      // is a button

      // click event handler
      const handleClick = () => {
        if (current.children) onNext(current);
        else if(current.action === "lang") {
          alert("To set language to " + current.title);
        }
      };

      return (
        <div {...props} onClick={handleClick}>
          {itemContent}
        </div>
      );
    
    }
  }, [current, onNext]);

  return <li key={current.title}>{content}</li>;
}

interface BackButtonProps {
  onBack: () => void,
  title: string
}

const BackButton = ({onBack, title}: BackButtonProps) => {
  return (
    <CustomButton
      className={styles["menu-popup__title"]}
      onClick={onBack}
    >
      <BsChevronLeft />
      {title}
    </CustomButton>
  );
}

export default Popup;
