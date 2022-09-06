import React from "react";

// components
import CommonSidebar, { SidebarDelimiter } from "./common";
import LogInSection from "./LogInSection";
import Suggested from "./Suggested";

// Redux
import { useIsLoggedIn } from "_/features/currentUser/currentUserSlice";

function Sidebar() {
  const isLoggedIn = useIsLoggedIn();

  return (
    <CommonSidebar>
      <React.Fragment>
        {!isLoggedIn && <LogInSection />}
        <SidebarDelimiter />

        <Suggested />
      </React.Fragment>
    </CommonSidebar>
  );
}

export default Sidebar;
