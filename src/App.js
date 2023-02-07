import { useContext, useState } from "react";
import Layout from "./components/Layout/Layout";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.scss";

import Dashboard from "./pages/Dashboard";

import ProfilePage from "./pages/ProfilePage";

function App() {
  //const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>

        <Route path="/dashboard">
          <Dashboard />
        </Route>

        <Route path="/account">
          <ProfilePage />
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
