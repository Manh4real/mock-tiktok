import React, { useEffect } from "react";

// variables
import routes, { pagesTitle } from "_/config/routes";

function Upload() {
  // page title
  useEffect(() => {
    document.title = pagesTitle[routes.upload] as string;
  }, []);

  return <h1>Upload page</h1>;
}

export default Upload;
