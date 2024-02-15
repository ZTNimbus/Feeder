import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "materialize-css/dist/css/materialize.min.css";

import { Provider as StoreProvider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

import reducers from "./reducers";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = createStore(reducers, applyMiddleware(thunk));

root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>
);

export default store;
