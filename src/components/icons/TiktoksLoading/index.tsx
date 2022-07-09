import React from "react";

import styles from "./TiktoksLoading.module.scss";

function TiktoksLoading() {
  return (
    <svg
      preserveAspectRatio="none"
      viewBox="0 0 200 200"
      width="32"
      height="32"
      className="tiktok-qmnyxf-SvgContainer e1ugmybf1"
    >
      <defs>
        <mask id="redhole-1657018296391">
          <rect width="100%" height="100%" fill="white"></rect>
          <circle className={styles["circle-1"]}></circle>
        </mask>
        <mask id="greenhole-1657018296391">
          <rect width="100%" height="100%" fill="white"></rect>
          <circle className={styles["circle-2"]}></circle>
        </mask>
      </defs>
      <circle
        strokeWidth="2"
        stroke="#3AF2FF"
        className={styles["circle-3"]}
      ></circle>
      <circle
        mask="url(#redhole-1657018296391)"
        className={styles["circle-4"]}
      ></circle>
      <circle
        mask="url(#greenhole-1657018296391)"
        className={styles["circle-5"]}
      ></circle>
    </svg>
  );
}

export default TiktoksLoading;
