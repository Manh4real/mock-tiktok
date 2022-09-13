import React from "react";
import clsx from "clsx";
import { To, useNavigate } from "react-router-dom";

// icons
import { FiAlertTriangle } from "react-icons/fi";

// styles
import styles from "./SomethingWentWrong.module.scss";

const SomethingWentWrong = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(0 as To, { replace: true });
  };

  return (
    <div className={clsx("flex-center", styles["container"])}>
      <div>
        <FiAlertTriangle size={90} stroke="grey" />
      </div>
      <h3>Something went wrong.</h3>
      <button
        className={clsx(
          "grey-outlined",
          "flex-center",
          styles["tryAgain-button"]
        )}
        onClick={handleClick}
      >
        Try again
      </button>
    </div>
  );
};

export default SomethingWentWrong;
