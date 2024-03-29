import React from "react";
import clsx from "clsx";

// icons
import { FiAlertTriangle } from "react-icons/fi";

// styles
import styles from "_/components/LoginModal/LoginModal.module.scss";

// types
interface AlertIconProps {
  style?: {
    [index: string]: string | number;
  };
}
interface InputErrorMessageProps {
  message: string | JSX.Element;
}

export const AlertIcon = ({ style }: AlertIconProps) => {
  return (
    <div className={styles["input-alert-icon"]} style={style}>
      <FiAlertTriangle stroke="red" />
    </div>
  );
};

export const InputErrorMessage = ({ message }: InputErrorMessageProps) => {
  return (
    <p className={clsx(styles["row"], styles["input-error-message"])}>
      {message}
    </p>
  );
};
