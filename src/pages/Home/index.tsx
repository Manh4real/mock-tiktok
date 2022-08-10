import React, { useEffect } from "react";

// variables
import routes, { pagesTitle } from "_/config/routes";

// components
import Post from "_/components/Post";

function Home() {
  useEffect(() => {
    document.title = pagesTitle[routes.root] as string;
  }, []);

  return (
    <div style={{ minHeight: "200vh" }}>
      <Post />
      <Post />
    </div>
  );
}

export default Home;
