import React from "react";
import clsx from "clsx";

interface Props {
  children?: JSX.Element;
  title: string;
  subtitle?: string;
}
function NotFound({ children, title, subtitle }: Props) {
  return (
    <div
      className={clsx("flex-center")}
      style={{
        flexDirection: "column",
        textAlign: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div>{children}</div>
      <p style={{ fontSize: 24, fontWeight: 600 }}>{title}</p>
      <p className={clsx("grey-font")}>{subtitle}</p>
    </div>
  );
}

export default NotFound;
