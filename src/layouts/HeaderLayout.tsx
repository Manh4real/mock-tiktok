import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "_/components/Footer";
import Header from "_/components/Header";

function HeaderLayout() {
  return (
    <>
      <Header isFullWidth={true} />
      <Outlet />
      <Footer />
    </>
  );
}

export default HeaderLayout;
