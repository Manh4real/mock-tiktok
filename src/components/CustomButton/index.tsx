import clsx from "clsx";
import React from "react";

import styles from "./CustomButton.module.scss";

interface Props {
  type?: "button" | "submit" | "reset" | undefined;
  primary?: boolean;
  outlined?: boolean;
  unset?: boolean;
  large?: boolean;
  rounded?: boolean;
  circle?: boolean;
  centered?: boolean;
  disabled?: boolean;
  to?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: {
    [index: string]: string | number;
  };
  className?: string;
  children: React.ReactNode;
}

function CustomButton(
  {
    type = "button",
    unset = false,
    primary = false,
    outlined = false,
    circle = false,
    large = false,
    rounded = false,
    centered = true,
    disabled = false,
    className,
    style,
    onClick,
    children,
  }: Props,
  ref: React.LegacyRef<HTMLButtonElement> | undefined
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      style={style}
      onClick={onClick}
      className={clsx(
        styles["btn"],
        {
          [styles["centered"]]: centered,
          [styles["large"]]: large,
          [styles["rounded"]]: rounded,
          [styles["circle"]]: circle,
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
