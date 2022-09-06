import React, { useEffect } from "react";

// variables
import routes, { pagesTitle } from "_/config/routes";
import Posts from "_/pages/Home/Posts";

function Following() {
  // page title
  useEffect(() => {
    document.title = pagesTitle[routes.following] as string;
  }, []);

  return (
    <div>
      <Posts type="following" />
    </div>
  );
}

export default Following;
