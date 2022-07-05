import React from "react";

// icons
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// styles
import styles from "./Spinner.module.scss";

function Spinner() {
  return (
    <div className={styles["spinner"]}>
      <AiOutlineLoading3Quarters />
    </div>
  );
}

export default Spinner;
