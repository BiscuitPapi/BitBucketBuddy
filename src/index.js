import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SignIn } from "./pages";
import Login from "./pages/Login/Login";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
