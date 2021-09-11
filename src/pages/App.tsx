import Layout from "@components/global/layout/Layout";
import React from "react";
import { Route, Switch } from "react-router";
import LoginPage from "./auth/LoginPage";
import "antd/dist/antd.css";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/login" component={LoginPage} exact />
        <Route path="/" component={Layout} />
      </Switch>
    </div>
  );
}

export default App;
