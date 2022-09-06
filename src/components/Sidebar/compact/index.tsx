import React from "react";
import { useParams } from "react-router";

// Redux
import {
  useCurrentUserInfo,
  useIsLoggedIn,
} from "_/features/currentUser/currentUserSlice";

// components
import CommonSidebar, { SidebarDelimiter } from "../common";
import LogInSection from "../LogInSection";
import Suggested from "../Suggested";

// styles
function CompactSidebar() {
  const params = useParams();

  const currentUserInfo = useCurrentUserInfo();
  const isLoggedIn = useIsLoggedIn();

  // current page is of current logged-in user
  const isSelf =
    isLoggedIn && params.usernameParam === currentUserInfo?.nickname;

  return (
    <CommonSidebar compact>
      <LogInSection />
      <SidebarDelimiter />
      {!isSelf && <Suggested />}
    </CommonSidebar>
  );
}

export default CompactSidebar;
