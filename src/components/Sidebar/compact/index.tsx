import React from "react";

// components
import CommonSidebar from "../common";
import Suggested from "../Suggested";

// styles
function CompactSidebar() {
  // current page is of current logged-in user
  const isSelf = true;

  return <CommonSidebar compact>{isSelf && <Suggested />}</CommonSidebar>;
}

export default CompactSidebar;
