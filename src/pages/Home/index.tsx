import React, { useEffect } from "react";

// variables
import routes, { pagesTitle } from "_/config/routes";

// components
import Posts from "./Posts";

// context
import { CurrentVideoProvider } from "_/contexts";

function Home() {
  //
  useEffect(() => {
    document.title = pagesTitle[routes.root] as string;
  }, []);

  return (
    <div>
      <CurrentVideoProvider>
        <Posts />
      </CurrentVideoProvider>
    </div>
  );
}

export default Home;
