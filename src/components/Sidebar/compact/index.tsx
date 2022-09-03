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

  const { isLoggedIn, currentUser } = useLoginContext();

  // current page is of current logged-in user
  const isSelf =
    isLoggedIn && params.usernameParam === currentUser?.info.data.nickname;

  return (
    <CommonSidebar compact>
      <LogInSection />
      <SidebarDelimiter />
      {!isSelf && <Suggested />}
    </CommonSidebar>
  );
}

export default CompactSidebar;
