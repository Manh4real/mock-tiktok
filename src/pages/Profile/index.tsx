import React, { useEffect } from "react";
import { useParams } from "react-router";
import routes, { pagesTitle } from "_/config/routes";

function Profile() {
  const params = useParams();

  // page title
  useEffect(() => {
    const foo = pagesTitle[routes.profile] as any;
    document.title = foo("gang", "gang");
  }, []);

  return <h1>Profile page of {params.usernameParam}</h1>;
}

export default Profile;
