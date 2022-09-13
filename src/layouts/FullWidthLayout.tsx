import React from "react";
import { Outlet } from "react-router-dom";

// components
import Header from "_/components/Header";
import CompactSideBar from "_/components/Sidebar/compact";

// styles
import styles from "./FullWidthLayout.module.scss";

// types
interface Props {
  children?: JSX.Element;
}

function FullWidthLayout({ children }: Props) {
  return (
    <React.Fragment>
      <Header isFullWidth={true} />
      <div className={styles["container"]}>
        <div className={styles["sidebar"]}>
          <CompactSideBar />
        </div>
        <main className={styles["main"]}>
          {children}
          <Outlet />
        </main>
      </div>
    </React.Fragment>
  );
}

export default FullWidthLayout;
