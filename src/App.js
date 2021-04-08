import React, { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Board from "./components/Board/Board";
import Home from "./components/Home/Home";
import Statistics from "./components/Statistics/Statistics";
import { setCategory } from "./store/actions/searchBar";
import { getEmp } from "./store/actions/home";
import styled from "styled-components";

//padding 및 border 속성이 각 요소의 전체 width,
//height에 포함되도록 모든 HTML 요소의 box-sizing 속성을 border-box로 설정.

const AppContainer = styled.div`
  &,
  &* {
    box-sizing: border-box;
  }
`;

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
    <AppContainer>
      <Switch>
        <Route path="/" exact render={() => <Home />} />
        <Route path="/board" render={() => <Board />} />
        <Route path="/statistics" render={() => <Statistics />} />
      </Switch>
    </AppContainer>
  );
};

export default App;
