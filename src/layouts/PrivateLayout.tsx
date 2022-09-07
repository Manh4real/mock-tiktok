import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// variables
import routes from "_/config/routes";

// context
// import { useLoginContext } from "_/contexts";
import { useIsLoggedIn } from "_/features/currentUser/currentUserSlice";

// types
interface Props {
  children?: JSX.Element;
}

function PrivateLayout({ children }: Props) {
  // const { token } = useLoginContext();
  const isLoggedIn = useIsLoggedIn();
  const location = useLocation();

  if (!isLoggedIn)
    return (
      <Navigate
        to={
          routes.login + "?redirect_url=" + location.pathname + location.search
        }
        replace={true}
      />
    );

  return (
    <>
      {children}
      <Outlet />
    </>
  );
}

export default PrivateLayout;
