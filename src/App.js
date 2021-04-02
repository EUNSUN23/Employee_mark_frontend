import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Board from "./components/Board/Board";
import Home from "./components/Home";
import Statistics from "./components/Statistics/Statistics";
import { setCategory } from "./store/actions/searchBar";
import { getEmp } from "./store/actions/home";

const App = () => {
  const dispatch = useDispatch();
  const searchCategory = useSelector((state) => state.searchBar.loading);
  useEffect(() => {
    if (searchCategory) return;
    dispatch(setCategory());
    dispatch(getEmp());
  }, []);

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
