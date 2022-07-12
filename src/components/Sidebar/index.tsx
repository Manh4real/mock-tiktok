import React, { useContext } from "react";

// context
import { LoginContext } from "_/App";

// components
import CommonSidebar from "./common";
import LogInSection from "./LogInSection";
import Suggested from "./Suggested";

function Sidebar() {
  const { isLoggedIn } = useContext(LoginContext);

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
