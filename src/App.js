import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Board from "./components/Board/Board";
import Home from "./components/Home";
import Statistics from "./components/Statistics/Statistics";
import { setCategory } from "./store/actions/searchBar";
import CustomSwiper from "./components/Statistics/Graph/SalaryStackChart/CustomSwiper";

const App = () => {
  const dispatch = useDispatch();
  const searchCategory = useSelector((state) => state.searchBar.loading);
  useEffect(() => {
    if (searchCategory) return;
    dispatch(setCategory());
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
