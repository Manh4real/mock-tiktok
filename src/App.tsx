import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import { Home, Following, Profile, Upload, Search, NotFound } from "./pages";

// layouts
import { DefaultLayout, HeaderLayout, FullWidthLayout } from "./layouts";

// components
import ToTopButton from "_/components/ToTopButton";
import ToggleButton from "_/ToggleButton";

import { LoginContextProvider } from "_/contexts/AppContext";

// variables
import routes from "_/config/routes";

function App() {
  return (
    <LoginContextProvider>
      <BrowserRouter>
        <ToggleButton />

        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path={routes.root} element={<Home />} />
            <Route path={routes.following} element={<Following />} />
            <Route path={routes.search} element={<Search />} />
            <Route path="/tag/:tagParam" element={<h1>Tag</h1>} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route element={<HeaderLayout />}>
            <Route path={routes.upload} element={<Upload />} />
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
        </Routes>
        <ToTopButton />
      </BrowserRouter>
    </LoginContextProvider>
  );
}

export default App;
