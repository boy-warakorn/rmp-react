import "./styles/tailwind.css";
import "antd/dist/antd.css";
import "./styles/index.css";

import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "@stores/store";

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </Router>,
  document.getElementById("root")
);
