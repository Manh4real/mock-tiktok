import React from "react";

// hooks
import { useLoginContext } from "_/contexts/AppContext";

// components
import CommonSidebar from "./common";
import LogInSection from "./LogInSection";
import Suggested from "./Suggested";

function Sidebar() {
  const { isLoggedIn } = useLoginContext();

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
