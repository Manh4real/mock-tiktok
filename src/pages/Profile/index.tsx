import React from "react";
import { useParams } from "react-router";

function Profile() {
  const params = useParams();

  return <h1>Profile page of {params.usernameParam}</h1>;
}

export default Profile;
