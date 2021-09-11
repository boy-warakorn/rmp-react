import Layout from "@components/layout/Layout";
import React, { useEffect } from "react";
import { Route, Switch } from "react-router";
import LoginPage from "./auth/LoginPage";

function App() {
  useEffect(() => {
    if (window.location.pathname === "/") window.location.pathname = "/login";
  }, []);

  return (
    <div>
      <Switch>
        <Route path="/login" component={LoginPage} exact />
        <Route path="/home" component={Layout} exact />
      </Switch>
    </div>
  );
}

export default App;
