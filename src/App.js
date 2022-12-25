import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import MainHeader from "./shared/compnents/Navigation/MainHeader";
import MainNavigation from "./shared/compnents/Navigation/MainNavigation";
import Users from "./users/pages/Users";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path={"/"} exact>
            <Users />
          </Route>
          <Route path={"/places/new"}>
            <NewPlace />
          </Route>
          <Route path={"/:uid/places"} exact>
            <UserPlaces />
          </Route>
          <Redirect to={"/"} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;