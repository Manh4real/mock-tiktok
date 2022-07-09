import React from "react";
import { useParams } from "react-router";

// components
import CommonSidebar from "../common";
import Suggested from "../Suggested";

// styles
function CompactSidebar() {
  const params = useParams();

  // current page is of current logged-in user
  const isSelf = params.usernameParam === "gang4L";

  return <CommonSidebar compact>{!isSelf && <Suggested />}</CommonSidebar>;
}

export default CompactSidebar;
