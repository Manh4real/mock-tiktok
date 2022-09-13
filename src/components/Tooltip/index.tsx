import React from "react";
import Tippy from "@tippyjs/react";

// styles
import styles from "./Tooltip.module.scss";

// types
import { Placement } from "@popperjs/core";

interface Props {
  title: string;
  placement?: Placement;
  children: JSX.Element;
}

function Tooltip({ title, placement = "bottom", children }: Props) {
  return (
    <Tippy
      zIndex={10000}
      delay={[0, 300]}
      placement={placement}
      content={
        <div className={styles["tooltip"]} tabIndex={-1}>
          {title}
        </div>
      }
    >
      {children}
    </Tippy>
  );
}

export default Tooltip;
