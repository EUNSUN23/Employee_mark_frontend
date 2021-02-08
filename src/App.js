import React, { useEffect, useState, useCallback } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Board from "./components/EmployeeBoard/Board";
import DefaultLayout from "./components/DefaultLayout";
import Home from "./components/Home";
import Statistics from "./components/Statistics";

const App = () => {
  const [render, setRender] = useState(null);
  const history = useHistory();
  const location = history.location.pathname;

  const initPage = useCallback(() => {
    if (render === null) {
      setRender(true);
    } else {
      setRender(!render);
    }
  }, [location]);

  return (
    <div className="App">
      <DefaultLayout>
        <Switch>
          <Route path="/" exact render={() => <Home />} />
          <Route
            path="/board"
            render={() => (
              <Board
                location={location}
                initPage={initPage}
                isInitialized={render}
              />
            )}
          />
          <Route
            path="/statistics"
            render={() => (
              <Statistics
                location={location}
                initPage={initPage}
                isInitialized={render}
              />
            )}
          />
        </Switch>
      </DefaultLayout>
    </div>
  );
};

export default App;
