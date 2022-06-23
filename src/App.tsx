import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Following, Profile, Upload, Search } from "./pages";

import { DefaultLayout, HeaderLayout, FullWidthLayout } from "./layouts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/following" element={<Following />} />
          <Route path="/search" element={<Search />} />
          <Route
            path="/live"
            element={
              <div>
                <h1>Live</h1>
              </div>
            }
          />
          <Route path="/tag/:tagParam" element={<h1>Tag</h1>} />
        </Route>
        <Route element={<HeaderLayout />}>
          <Route path="/upload" element={<Upload />} />
        </Route>
        <Route element={<FullWidthLayout />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
