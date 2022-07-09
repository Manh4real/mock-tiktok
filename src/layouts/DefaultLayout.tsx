import React from "react";
import { Outlet } from "react-router-dom";

import Header from "_/components/Header";
import Sidebar from "_/components/Sidebar";

import styles from "./DefaultLayout.module.scss";

function DefaultLayout() {
  return (
    <React.Fragment>
      <Header isFullWidth={false} />
      <div className={styles["container"]}>
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </React.Fragment>
  );
}

export default DefaultLayout;
