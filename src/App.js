import React, { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Board from "./components/Board/Board";
import Home from "./components/Home/Home";
import Statistics from "./components/Statistics/Statistics";
import { setCategory } from "./store/actions/searchBar";
import { getEmp } from "./store/actions/home";

const App = () => {
  const dispatch = useDispatch();
  const categoryLoaded = useSelector(
    (state) => state.searchBar.category,
    shallowEqual
  );
  const empLoaded = useSelector((state) => state.home.total, shallowEqual);
  useEffect(() => {
    if (categoryLoaded && empLoaded) return;
    !categoryLoaded && dispatch(setCategory());
    !empLoaded && dispatch(getEmp());
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
