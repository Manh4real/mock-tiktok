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
import { clearVideoId } from "_/features/currentVideo/currentVideoSlice";

function Following() {
  const isLoggedIn = useIsLoggedIn();

  const dispatch = useAppDispatch();

  //
  useEffect(() => {
    dispatch(resetVideos());
    dispatch(clearVideoId());
  }, [dispatch]);

  // page title
  useEffect(() => {
    document.title = pagesTitle[routes.following] as string;
  }, []);

  if (!isLoggedIn) return <Message />;

  return (
    <div>
      <Posts type="following" />
    </div>
  );
}

const Message = () => {
  const redirectUrlSearchParam = useRedirectURL();

  return (
    <p
      style={{
        fontSize: 30,
        fontWeight: 600,
        margin: 30,
        textAlign: "center",
      }}
    >
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
};

export default Following;
