import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import StateProvider from "./context/StateProvider";
import { initialState, reducer } from "./context/reducer";

ReactDOM.render(
  <BrowserRouter>
    <StateProvider initialState={initialState} reducer={reducer}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </StateProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
