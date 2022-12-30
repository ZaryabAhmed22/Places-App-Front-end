import React, { useCallback, useState } from "react";
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
import { AuthContext } from "./shared/context/auth-context";
import Auth from "./users/pages/Auth";
import Users from "./users/pages/Users";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
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
    </AuthContext.Provider>
  );
}

export default App;
