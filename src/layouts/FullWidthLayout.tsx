import React from "react";
import { Outlet } from "react-router-dom";

// components
import Header from "_/components/Header";
import CompactSideBar from "_/components/Sidebar/compact";

// styles
import styles from "./common.module.scss";

// types
interface Props {
  children?: JSX.Element;
}

function FullWidthLayout({ children }: Props) {
  return (
    <React.Fragment>
      <Header isFullWidth={true} />
      <div className={styles["container"]}>
        <CompactSideBar />
        {children}
        <Outlet />
      </div>
    </React.Fragment>
  );
}

export default FullWidthLayout;
