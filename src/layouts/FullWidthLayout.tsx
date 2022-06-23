import React from "react";
import { Outlet } from "react-router";

import Header from "_/components/Header";
import CompactSideBar from "_/components/CompactSideBar";

function FullWidthLayout() {
  return (
    <React.Fragment>
      <Header isFullWidth={true} />
      <CompactSideBar />
      <Outlet />
    </React.Fragment>
  );
}

export default FullWidthLayout;
