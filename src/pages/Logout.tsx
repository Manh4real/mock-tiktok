import React, { useEffect } from "react";
import { useNavigate } from "react-router";

// Redux
import { logout, useIsLoggedIn } from "_/features/currentUser/currentUserSlice";
import { useAppDispatch } from "_/features/hooks";
import { show } from "_/features/alert/alertSlice";

const Logout = () => {
  const navigate = useNavigate();

  const isLoggedIn = useIsLoggedIn();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/", { replace: true });
      return;
    }

    dispatch(logout())
      .unwrap()
      .then((response) => {
        console.log("logged out", response);

        localStorage.setItem("tiktok_access_token", JSON.stringify(null));
      })
      .catch(() => {
        dispatch(show({ message: "Logout Error: Something went wrong." }));
      })
      .finally(() => {
        navigate("/", { replace: true });
      });
  }, [dispatch, isLoggedIn, navigate]);

  return <></>;
};

export default Logout;
