import React from "react";
import clsx from "clsx";
import { To, useNavigate } from "react-router-dom";

// styles
import styles from "./NoInternet.module.scss";

function NoInternet() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(0 as To, { replace: true });
  };

  return (
    <div className={clsx("flex-center", styles["container"])}>
      <div className={styles["icon"]}>
        <svg
          width="90"
          height="90"
          viewBox="0 0 72 72"
          fill="rgba(128, 130, 133, 1)"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M36.2544 66.8965C38.3507 66.8965 40.05 65.1971 40.05 63.1008C40.05 61.0045 38.3507 59.3052 36.2544 59.3052C34.1581 59.3052 32.4587 61.0045 32.4587 63.1008C32.4587 65.1971 34.1581 66.8965 36.2544 66.8965Z"></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M44.0911 16.0463L41.8628 18.7804C39.935 18.56 37.9871 18.4349 36.0341 18.4349C24.1665 18.4349 12.6093 22.5961 3.48571 30.1523C3.20529 30.3826 2.86479 30.4978 2.52929 30.4978C2.09865 30.4978 1.66801 30.3125 1.37257 29.952C0.846784 29.3161 0.931911 28.3696 1.57286 27.8389C11.2322 19.8369 23.4755 15.4304 36.0392 15.4304C38.7482 15.4304 41.4372 15.6457 44.0911 16.0463ZM32.779 29.9221C25.0625 30.5381 17.8117 33.3573 11.6475 38.1594C10.9915 38.6702 10.8764 39.6116 11.3871 40.2675C11.8979 40.9235 12.8393 41.0387 13.4953 40.5279C18.3926 36.7123 24.0309 34.2536 30.0449 33.2771L32.779 29.9221ZM50.2049 48.4843C46.0137 45.6501 41.1114 44.1528 36.0338 44.1528C34.8821 44.1528 33.7454 44.233 32.6187 44.3832L29.5892 48.0987C31.6623 47.4778 33.8255 47.1523 36.0338 47.1523C40.5105 47.1523 44.8269 48.4693 48.5224 50.968C49.2134 51.4337 50.1448 51.2534 50.6105 50.5624C51.0762 49.8814 50.8909 48.95 50.2049 48.4843ZM60.4207 38.1653C55.4934 34.3245 49.875 31.7607 43.8811 30.5689L41.7079 33.2379C47.842 34.1793 53.5906 36.653 58.573 40.5338C58.8484 40.7491 59.1739 40.8493 59.4943 40.8493C59.94 40.8493 60.3857 40.649 60.6811 40.2684C61.1969 39.6174 61.0767 38.676 60.4207 38.1653ZM53.7655 18.4401C59.7944 20.5282 65.4529 23.6729 70.4253 27.779C71.0662 28.3048 71.1563 29.2512 70.6255 29.8972C70.0998 30.5331 69.1534 30.6232 68.5124 30.0975C63.53 25.9863 57.8215 22.8967 51.7374 20.9288L53.7655 18.4401Z"
          ></path>
          <path d="M14.4869 61.0034C14.1514 61.0034 13.8159 60.8932 13.5405 60.6679C12.8996 60.1421 12.7994 59.1957 13.3252 58.5547L56.3993 5.69607C56.9251 5.05512 57.8715 4.95497 58.5125 5.48075C59.1534 6.00653 59.2536 6.95294 58.7278 7.5939L15.6537 60.4526C15.3532 60.8181 14.9226 61.0034 14.4869 61.0034Z"></path>
        </svg>
      </div>
      <h2 className={styles["title"]}>Network error</h2>
      <p className={clsx("grey-font", styles["message"])}>
        Connect to the internet and try again.
      </p>
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
}

export default NoInternet;