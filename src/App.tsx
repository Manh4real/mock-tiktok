import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

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

import { AppModal } from "_/modals";

import {
  LoginContextProvider,
  ModalContextProvider,
  CurrentVideoProvider,
} from "_/contexts";
// variables
import routes from "_/config/routes";

function App() {
  const location = useLocation();

  const locationState = location.state as any;
  const background = locationState && locationState.background;

  useEffect(() => {
    if (background) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "overlay";
  }, [background]);

  return (
    <LoginContextProvider>
      <ModalContextProvider>
        <CurrentVideoProvider>
          <React.Fragment>
            <AppModal />
            <Routes location={background || location}>
              <Route element={<DefaultLayout />}>
                <Route path={routes.root} element={<Home />} />
                <Route path={routes.following} element={<Following />} />
                <Route path={routes.search} element={<Search />} />
                <Route path="/tag/:tagParam" element={<h1>Tag</h1>} />
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route element={<FullWidthLayout />}>
                <Route path={routes.live} element={<h1>Live</h1>} />
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
                <Route
                  path={"phone-email"}
                  element={<PhoneEmailSignupPage />}
                />
              </Route>
              <Route path={routes.logout} element={<Logout />} />
              <Route
                path={routes.reset}
                element={<ResetPasswordPage />}
              ></Route>

              <Route path="/video/:videoId" element={<VideoDetails />} />
            </Routes>
            {background && (
              <Routes>
                <Route path="/video/:videoId" element={<VideoDetails />} />
              </Routes>
            )}
            <ToTopButton />
          </React.Fragment>
        </CurrentVideoProvider>
      </ModalContextProvider>
    </LoginContextProvider>
  );
}

export default App;
