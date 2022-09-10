import React from "react";
import { Outlet } from "react-router-dom";

import Header from "_/components/Header";
import Sidebar from "_/components/Sidebar";

import styles from "./DefaultLayout.module.scss";

// types
interface Props {
  children?: React.ReactNode;
}

function DefaultLayout({ children }: Props) {
  return (
    <React.Fragment>
      <Header isFullWidth={false} />
      <div className={styles["container"]}>
        <div className={styles["sidebar"]}>
          <Sidebar />
        </div>
        <main className={styles["main"]}>
          <Outlet />
          {children}
        </main>
      </div>
    </React.Fragment>
  );
}

export default DefaultLayout;
