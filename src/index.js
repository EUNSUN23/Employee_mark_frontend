import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@material-ui/core/styles";
// import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
// const theme = unstable_createMuiStrictModeTheme();
import theme from "./shared/theme";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import keywords from "./store/reducers/keywords";
import searchEmp from "./store/reducers/searchEmp";
import searchBar from "./store/reducers/searchBar";
import statBar from "./store/reducers/statBar";
import statPage from "./store/reducers/statPage";
import home from "./store/reducers/home";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : null;

const rootReducer = combineReducers({
  keywords: keywords,
  searchEmp: searchEmp,
  searchBar: searchBar,
  statBar: statBar,
  statPage: statPage,
  home: home,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
