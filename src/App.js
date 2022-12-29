import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import UserPlaces from "./places/pages/UserPlaces";
import MainHeader from "./shared/compnents/Navigation/MainHeader";
import MainNavigation from "./shared/compnents/Navigation/MainNavigation";
import Auth from "./users/pages/Auth";
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
          <Route path={"/places/:pid"}>
            <UpdatePlace />
          </Route>
          <Route path={"/auth"}>
            <Auth />
          </Route>
          <Redirect to={"/"} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
