import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLoginContext } from "_/contexts";
import { logout } from "_/services/auth";

const Logout = () => {
  const navigate = useNavigate();
  const { clearCurrentUser, token } = useLoginContext();

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    logout()
      .then((response) => {
        console.log("logged out", response);

        localStorage.setItem("tiktok_access_token", JSON.stringify(null));
        clearCurrentUser();
      })
      .catch(() => {
        console.log("Logout Error: Something went wrong.");
      })
      .finally(() => {
        navigate("/", { replace: true });
      });
  }, [navigate, clearCurrentUser, token]);

  return <></>;
};

export default Logout;
