import React, { useEffect } from "react";

// variables
import routes, { pagesTitle } from "_/config/routes";

// components
import Posts from "./Posts";

function Home() {
  //
  useEffect(() => {
    document.title = pagesTitle[routes.root] as string;
  }, []);

  return (
    <div>
      <Posts />
    </div>
  );
}

export default React.memo(Home);
