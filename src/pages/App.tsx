import React, { useEffect } from "react";
import { Route, Switch } from "react-router";
import LoginPage from "./auth/LoginPage";

function App() {
  useEffect(() => {
    if (window.location.pathname !== "/login")
      window.location.pathname = "/login";
  }, []);

  return (
    <div>
      <Switch>
        <Route path="/login" component={LoginPage} exact />
      </Switch>
    </div>
  );
}

export default App;
