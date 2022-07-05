import React, { useRef } from "react";
import Tippy from "@tippyjs/react/headless";

// components
import Popup from "./Popup";

// styles
import styles from "./Popper.module.scss";

// types
import { PopupMenuItem } from "_/types";

interface Props {
  menu?: PopupMenuItem[];
  children?: JSX.Element;
  hideOnClick?: boolean;
  handleClickOutside?: (...args: any[]) => void;
}
export interface PopperRefObject {
  reset: () => void;
}

function Popper({
  menu = [],
  handleClickOutside,
  hideOnClick,
  children,
}: Props) {
  const popupRef = useRef<PopperRefObject>(null);

  return (
    <Tippy
      hideOnClick={hideOnClick}
      onClickOutside={() => handleClickOutside && handleClickOutside()}
      interactive={true}
      placement="bottom-end"
      delay={[0, 800]}
      render={(attrs) => {
        return (
          <div className={styles["popper"]} {...attrs}>
            {<Popup ref={popupRef} menu={menu} />}
          </div>
        );
      }}
      onHide={() => {
        popupRef.current?.reset();
      }}
    >
      {children}
    </Tippy>
  );
}

export default Popper;
