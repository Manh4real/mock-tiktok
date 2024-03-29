import React, { useEffect, useState, useMemo } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import clsx from "clsx";
import axios from "axios";

// pages
import {
  Home,
  Following,
  Profile,
  Upload,
  Search,
  NotFound,
  Login,
  Signup,
  LoginWithPhone,
  LoginWithEmail,
  ResetPasswordPage,
  PhoneEmailSignupPage,
  Logout,
  VideoDetails,
  NoInternet,
} from "./pages";

// layouts
import {
  DefaultLayout,
  HeaderLayout,
  FullWidthLayout,
  PrivateLayout,
} from "./layouts";

// components
import ToTopButton from "_/components/ToTopButton";
import Alert from "_/components/__Alert__/Alert";

// icons
import { Spinner } from "./components/icons";

// context
import { CurrentVideoProvider } from "_/contexts";

// hooks
import { useBackgroundLocation } from "./hooks";

// variables
import routes from "_/config/routes";

// helpers
import { overflowBodyHidden } from "_/helpers";

// Redux
import { useAppDispatch } from "_/features/hooks";
import { initCurrentUser } from "_/features/currentUser/currentUserSlice";
import { toggleMute } from "./features/currentVideo/currentVideoSlice";

// types
enum Status {
  LOADING = "loading",
  CONNECTED = "connected", 
  NO_INTERNET = "no internet"
}

const App = () => {
  const [status, setStatus] = useState<Status>(Status.LOADING);

  // check network connection
  useEffect(() => {
    axios
      .get("https://picsum.photos/200/300")
      .then(() => {
        setStatus(Status.CONNECTED);
      })
      .catch(() => {
        setStatus(Status.NO_INTERNET);
      });
  }, []);

  if (status === Status.LOADING) return <Loading />;
  else if (status === Status.NO_INTERNET) return <NoInternet />;
  return <Main />;
};

const Main = () => {
  const location = useLocation();
  const { backgroundLocation } = useBackgroundLocation();

  useEffect(() => {
    overflowBodyHidden(Boolean(backgroundLocation));
  }, [backgroundLocation]);

  // Redux
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initCurrentUser());
  }, [dispatch]);

  //
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!e) return;

      const eventTarget = e.target as HTMLElement;
      if (eventTarget.tagName === "INPUT") return;

      if (e.key.toLowerCase() !== "m") return;

      dispatch(toggleMute());
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  const _backgroundLocation = useMemo(() => {
    if(backgroundLocation) {
      backgroundLocation.state = location.state;
    }

    return backgroundLocation;
  }, [backgroundLocation, location.state]);

  return (
    <CurrentVideoProvider>
      <React.Fragment>
        <Alert />

        {/* ROUTES */}
        <Routes location={_backgroundLocation || location}>
          <Route element={<DefaultLayout />}>
            <Route path={routes.root} element={<Home />} />
            <Route path={routes.following} element={<Following />} />
            <Route path={routes.search} element={<Search />} />
            <Route path="/tag/:tagParam" element={<h1>Tag</h1>} />
            <Route path="*" element={<NotFound title="Page not found." />} />
          </Route>
          <Route element={<FullWidthLayout />}>
            <Route path={routes.live} element={<h1>Live</h1>} />
            <Route path="/video/:videoId" element={<VideoDetails />} />
            <Route path="/test" element={<h1>FYTB</h1>} />
          </Route>
          <Route
            path={routes.profile}
            element={
              <FullWidthLayout>
                <Profile />
              </FullWidthLayout>
            }
          />
          <Route element={<PrivateLayout />}>
            <Route element={<HeaderLayout />}>
              <Route path={routes.upload} element={<Upload />} />
            </Route>
          </Route>
          <Route path={routes.login}>
            <Route index element={<Login />} />
            <Route path="phone" element={<LoginWithPhone />} />
            <Route path="email" element={<LoginWithEmail />} />
          </Route>
          <Route path={routes.signup}>
            <Route index element={<Signup />} />
            <Route path={"phone-email"} element={<PhoneEmailSignupPage />} />
          </Route>
          <Route path={routes.logout} element={<Logout />} />
          <Route path={routes.reset} element={<ResetPasswordPage />}></Route>
        </Routes>
        {backgroundLocation && (
          <Routes>
            <Route path="/video/:videoId" element={<VideoDetails />} />
          </Routes>
        )}

        <ToTopButton />
      </React.Fragment>
    </CurrentVideoProvider>
  );
};

const Loading = () => {
  return (
    <div
      className={clsx("flex-center")}
      style={{ width: "100%", height: "100vh" }}
    >
      <Spinner style={{ width: "45px", height: "45px" }} />
    </div>
  );
};

export default React.memo(App);
