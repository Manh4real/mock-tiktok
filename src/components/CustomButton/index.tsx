import clsx from "clsx";
import React from "react";

import styles from "./CustomButton.module.scss";

interface Props {
  primary?: boolean;
  outlined?: boolean;
  unset?: boolean;
  large?: boolean;
  rounded?: boolean;
  centered?: boolean;
  disabled?: boolean;
  onClick?: () => any;
  style?: {
    [index: string]: string | number;
  };
  className?: string;
  children: JSX.Element | string;
}

function CustomButton(
  {
    unset = false,
    primary = false,
    outlined = false,
    large = false,
    rounded = false,
    centered = true,
    disabled = false,
    className,
    style,
    children,
  }: Props,
  ref: React.LegacyRef<HTMLButtonElement> | undefined
) {
  return (
    <button
      ref={ref}
      disabled={disabled}
      style={style}
      className={clsx(
        styles["btn"],
        {
          [styles["centered"]]: centered,
          [styles["large"]]: large,
          [styles["rounded"]]: rounded,
          [styles["disabled"]]: disabled,
          [styles["unset"]]: unset,
          [styles["primary"]]: primary,
          [styles["outlined"]]: outlined,
        },
        className
      )}
    >
      {children}
    </button>
  );
}

export default React.forwardRef(CustomButton);