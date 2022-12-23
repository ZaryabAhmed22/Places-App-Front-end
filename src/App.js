import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import Users from "./users/pages/Users";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={"/"} exact>
          <Users />
        </Route>
        <Route path={"/places/new"}>
          <NewPlace />
        </Route>
        <Redirect to={"/"} />
      </Switch>
    </Router>
  );
}

export default App;
