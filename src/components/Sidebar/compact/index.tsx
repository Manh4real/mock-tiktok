import React from "react";
import { useParams } from "react-router";

// context
import { useLoginContext } from "_/contexts";

// components
import CommonSidebar, { SidebarDelimiter } from "../common";
import LogInSection from "../LogInSection";
import Suggested from "../Suggested";

// styles
function CompactSidebar() {
  const params = useParams();

  const { isLoggedIn } = useLoginContext();
  // fake
  // current page is of current logged-in user
  const isSelf = isLoggedIn && params.usernameParam === "gang4L";

  return (
    <CommonSidebar compact>
      <LogInSection />
      <SidebarDelimiter />
      {!isSelf && <Suggested />}
    </CommonSidebar>
  );
}

export default CompactSidebar;
