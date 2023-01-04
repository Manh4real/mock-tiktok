import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import styles from "./Alert.module.scss";

import { useAlert, hide } from "_/features/alert/alertSlice";

const Alert = () => {
  const dipatch = useDispatch();
  const { isShowed, message } = useAlert();

  useEffect(() => {
    let timeID: NodeJS.Timeout;

    if (!isShowed) {
      return () => {
        if (timeID) {
          clearTimeout(timeID);
        }
      };
    }

    timeID = setTimeout(() => {
      dipatch(hide());
    }, 5000);

    return () => {
      clearTimeout(timeID);
    };
  }, [dipatch, isShowed]);

  if (!isShowed) return <></>;

  return <div className={styles["container"]}>{message}</div>;
};

export default Alert;
