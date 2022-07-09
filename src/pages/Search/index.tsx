import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// variables
import routes, { pagesTitle } from "_/config/routes";

// icons

function Search() {
  const [searchParams] = useSearchParams();

  // page title
  useEffect(() => {
    const foo = pagesTitle[routes.search] as any;
    document.title = foo(searchParams.get("q"));
  }, [searchParams]);

  return (
    <div>
      <h1>Search page - {searchParams.get("q")}</h1>
    </div>
  );
}

export default Search;
