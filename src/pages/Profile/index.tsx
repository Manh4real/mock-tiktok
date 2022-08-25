import React, { useEffect } from "react";
import { useParams } from "react-router";
import routes, { pagesTitle } from "_/config/routes";

// types
type PageTitleFunc = (name: string, username: string) => string;

function Profile() {
  const params = useParams();

  // page title
  useEffect(() => {
    const foo = pagesTitle[routes.profile] as PageTitleFunc;
    document.title = foo("gang", "gang");
  }, []);

  return <h1>Profile page of {params.usernameParam}</h1>;
}

export default Profile;
