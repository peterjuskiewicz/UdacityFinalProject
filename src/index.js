import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <App defaultQuery="the world's end camden" />,
  document.getElementById("root")
);

registerServiceWorker();
