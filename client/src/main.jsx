import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "materialize-css/dist/css/materialize.min.css";

import { Provider as StoreProvider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

import reducers from "./reducers";

const store = createStore(reducers, applyMiddleware(thunk));

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <React.StrictMode>

//   </React.StrictMode>
// );

let container = null;

// eslint-disable-next-line no-unused-vars
document.addEventListener("DOMContentLoaded", function (event) {
  if (!container) {
    container = document.getElementById("root");
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <StoreProvider store={store}>
          <App />
        </StoreProvider>
      </React.StrictMode>
    );
  }
});

export default store;
