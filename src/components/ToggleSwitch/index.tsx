import React from "react";
import clsx from "clsx";

// styles
import styles from "./ToggleSwitch.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const ToggleSwitch = (props: Props) => {
  return (
    <label className={styles["switch"]}>
      <input type="checkbox" {...props} />
      <span className={clsx(styles["slider"], styles["round"])}></span>
    </label>
  );
};

export default ToggleSwitch;
