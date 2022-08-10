import React from "react";

// icons
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// styles
import styles from "./Spinner.module.scss";

// types
interface Props {
  style?: {
    [index: string]: string | number;
  };
}

function Spinner({ style }: Props) {
  return (
    <div className={styles["spinner"]} style={style}>
      <AiOutlineLoading3Quarters className={styles["spinner__icon"]} />
    </div>
  );
}

export default Spinner;
