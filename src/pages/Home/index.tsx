import React, { useEffect } from "react";

// variables
import routes, { pagesTitle } from "_/config/routes";

function Home() {
  useEffect(() => {
    document.title = pagesTitle[routes.root] as string;
  }, []);

  return (
    <main style={{ minHeight: "200vh" }}>
      <h1>Home page</h1>
    </main>
  );
}

export default Home;
