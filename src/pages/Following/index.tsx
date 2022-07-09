import React, { useEffect } from "react";

// variables
import routes, { pagesTitle } from "_/config/routes";

function Following() {
  // page title
  useEffect(() => {
    document.title = pagesTitle[routes.following] as string;
  }, []);

  return <h1>Following page</h1>;
}

export default Following;
