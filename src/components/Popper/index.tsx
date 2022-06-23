import React from "react";

import styles from "./Popper.module.scss";

interface Props {
  children: JSX.Element;
}

function Popper({ children }: Props) {
  return <div className={styles["popper"]}>{children}</div>;
}

export default Popper;
