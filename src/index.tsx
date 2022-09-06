import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import GlobalStyles from "./components/GlobalStyles";

import reportWebVitals from "./reportWebVitals";

// Redux
import { Provider } from "react-redux";
import { store } from "_/features/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyles>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </GlobalStyles>
  </React.StrictMode>
);

reportWebVitals();
