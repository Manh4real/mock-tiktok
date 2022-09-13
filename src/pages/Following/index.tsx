import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

// variables
import routes, { pagesTitle } from "_/config/routes";

// components
import Posts from "_/pages/Home/Posts";

// hooks
import { useRedirectURL } from "_/hooks/useRedirect";

// Redux
import { useIsLoggedIn } from "_/features/currentUser/currentUserSlice";
import { useAppDispatch } from "_/features/hooks";
import { resetVideos } from "_/features/videos/videosSlice";

function Following() {
  const isLoggedIn = useIsLoggedIn();
  const redirectUrlSearchParam = useRedirectURL();

  const dispatch = useAppDispatch();

  //
  useEffect(() => {
    dispatch(resetVideos());
  }, [dispatch]);

  // page title
  useEffect(() => {
    document.title = pagesTitle[routes.following] as string;
  }, []);

  if (!isLoggedIn)
    return (
      <p style={{ fontSize: 30, fontWeight: 600 }}>
        <Link
          to={routes.login + redirectUrlSearchParam}
          className={clsx("pink-font", "hover-underlined")}
          style={{ marginRight: "6px" }}
        >
          Login
        </Link>
        to continue.
      </p>
    );

  return (
    <div>
      <Posts type="following" />
    </div>
  );
}

export default Following;
