import PrivateRoute from "@components/global/PrivateRoute";
import Layout from "@components/layout/Layout";
import React from "react";
import { Route, Switch } from "react-router";
import LoginPage from "./auth/LoginPage";

// @Note
// - refactor column to store
// - some layout can refactor into components

function App() {
  return (
    <div>
      <Switch>
        <Route path="/login" component={LoginPage} exact />
        <PrivateRoute path="/" component={Layout} />
      </Switch>
    </div>
  );
}

export default App;
