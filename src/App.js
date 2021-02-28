import React, { useState, useCallback } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Board from "./components/Board/Board";
import Home from "./components/Home";
import Statistics from "./components/Statistics";

const App = () => {
  const [render, setRender] = useState(null);

  const history = useHistory();
  const location = history.location.pathname;

  const initPage = useCallback(() => {
    if (location === null) {
      setRender(true);
    } else {
      setRender(!render);
    }
  }, [location]);

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact render={() => <Home />} />
        <Route path="/board" render={() => <Board location={location} />} />
        <Route
          path="/statistics"
          render={() => <Statistics location={location} />}
        />
      </Switch>
    </div>
  );
};

export default App;
