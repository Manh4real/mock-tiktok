import React from "react";
import { Outlet } from "react-router-dom";

// components
import Footer from "_/components/Footer";
import Header from "_/components/Header";

// styles
import styles from "./common.module.scss";

function HeaderLayout() {
  return (
    <>
      <Header isFullWidth={true} />
      <div className={styles["container"]}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default HeaderLayout;
