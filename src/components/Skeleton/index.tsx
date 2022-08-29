import React from "react";

import styles from "./Skeleton.module.scss";

type SizeProperty = React.CSSProperties["width"];

interface Props {
  width?: SizeProperty;
  height?: SizeProperty;
}

const Skeleton = ({ width, height }: Props) => {
  return <div className={styles["container"]} style={{ width, height }}></div>;
};

export default Skeleton;
