import clsx from "clsx";
import React, { useState } from "react";

// variables
import { images } from "_/images";

// styles
import styles from "./Image.module.scss";

// type
type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

function Image({
  src = "",
  alt = "",
  width = 32,
  height = 32,
  className,
  ...others
}: ImageProps) {
  const [fallbackImage, setFallbackImage] = useState("");

  const handleError = () => {
    setFallbackImage(images.userAvatarDefault);
  };

  return (
    <img
      className={clsx(styles["image"], className)}
      src={fallbackImage || src}
      alt={alt}
      width={width}
      height={height}
      onError={handleError}
      {...others}
    />
  );
}

export default Image;
