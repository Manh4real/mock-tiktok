import React from "react";
import Tippy from "@tippyjs/react";

// styles
import styles from "./Tooltip.module.scss";

// types
interface Props {
  title: string;
  children: JSX.Element;
}

function Tooltip({ title, children }: Props) {
  return (
    <Tippy
      zIndex={10000}
      delay={[0, 300]}
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
