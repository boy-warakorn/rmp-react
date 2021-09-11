import Layout from "@components/layout/Layout";
import React, { useState } from "react";
import { Route, Switch } from "react-router";
import LoginPage from "./auth/LoginPage";

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
