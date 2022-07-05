import React from "react";
import { useSearchParams } from "react-router-dom";

function Search() {
  const [searchParams] = useSearchParams();

  return <h1>Search page - {searchParams.get("q")}</h1>;
}

export default Search;
