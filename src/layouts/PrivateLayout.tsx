import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// variables
import routes from "_/config/routes";

// context
import { useIsLoggedIn } from "_/features/currentUser/currentUserSlice";
import { useRedirectURL } from "_/hooks/useRedirect";

// types
interface Props {
  children?: JSX.Element;
}

function PrivateLayout({ children }: Props) {
  const isLoggedIn = useIsLoggedIn();
  const redirectUrlSearchParam = useRedirectURL();

  if (!isLoggedIn)
    return (
      <Navigate to={routes.login + redirectUrlSearchParam} replace={true} />
    );

  return (
    <>
      {children}
      <Outlet />
    </>
  );
}

export default PrivateLayout;
