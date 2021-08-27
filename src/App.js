import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Feed from "./pages/feed/Feed";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/feed">
          <Feed />
        </Route>
        <Route exact path="/">
          <Redirect to="/feed" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
