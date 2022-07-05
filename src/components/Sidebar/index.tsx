import React from "react";

// components
import CommonSidebar from "./common";
import LogInSection from "./LogInSection";
import Suggested from "./Suggested";

function Sidebar() {
  const isLoggedIn = true;

  return (
    <CommonSidebar>
      <React.Fragment>
        {!isLoggedIn && <LogInSection />}
        <Suggested />
      </React.Fragment>
    </CommonSidebar>
  );
}

export default Sidebar;
