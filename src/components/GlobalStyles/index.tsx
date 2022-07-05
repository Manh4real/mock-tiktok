import React from "react";
import "./GlobalStyles.scss";

interface Props {
  children: React.ReactNode;
}

function GlobalStyles({ children }: Props) {
  return <React.Fragment>{children}</React.Fragment>;
}

export default GlobalStyles;
