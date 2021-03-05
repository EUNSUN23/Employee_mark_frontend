import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Board from "./components/Board/Board";
import Home from "./components/Home";
import Statistics from "./components/Statistics/Statistics";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact render={() => <Home />} />
        <Route path="/board" render={() => <Board />} />
        <Route path="/statistics" render={() => <Statistics />} />
      </Switch>
    </div>
  );
};

export default App;
