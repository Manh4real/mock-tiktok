import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// variables
import routes from "_/config/routes";

// context
import { useLoginContext } from "_/contexts";

// types
interface Props {
  children?: JSX.Element;
}

function PrivateLayout({ children }: Props) {
  const { isLoggedIn } = useLoginContext();

  if (!isLoggedIn) return <Navigate to={routes.login} replace={true} />;

  return (
    <>
      {children}
      <Outlet />
    </>
  );
}

export default PrivateLayout;
