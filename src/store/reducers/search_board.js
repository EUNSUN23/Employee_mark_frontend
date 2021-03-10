import * as actionTypes from "../actions/actionTypes";
import {
  setEmployeeData,
  fetchFail,
  addPage,
  initBoard,
  initCategory,
} from "../../shared/utility";

const initState = {
  employeeData: null,
  searchCategory: null,
  loading: false,
  nextLoading: false,
  errorMs: null,
  page: 1,
};

// const EMP_GET_CATEGORY = "EMP_GET_CATEGORY";
// const EMP_SEARCH_NAME = "EMP_SEARCH_NAME";
// const EMP_SEARCH_DEPT = "EMP_SEARCH_DEPT";
// const EMP_SEARCH_TITLE = "EMP_SEARCH_TITLE";
// const EMP_SET_DATA = "EMP_SET_DATA";
//const EMP_FETCH_FAIL = "EMP_FETCH_FAIL";
//const EMP_FETCH_START = "EMP_FETCH_START";
//const EMP_INIT_BOARD = "EMP_INIT_BOARD";
//const EMP_INIT_ERROR = "EMP_INIT_ERROR";
//const EMP_ADD_PAGE = "EMP_ADD_PAGE";

// const EMP_RANK_PERIOD = "EMP_RANK_PERIOD";
// const EMP_RANK_SALARY = "EMP_RANK_SALARY";
// const EMP_HISTORY = "EMP_HISTORY";

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.EMP_GET_CATEGORY:
    //return ;
    case actionTypes.EMP_SEARCH_NAME:
    //return ;
    case actionTypes.EMP_SEARCH_CATEGORY:
    //return;
    case actionTypes.EMP_SET_DATA:
      return setEmployeeData(state, action.employeeData, action.intersecting);
    case actionTypes.EMP_FETCH_START:
      const loading = action.intersecting ? "nextLoading" : "loading";
      return { ...state, [loading]: false };
    case actionTypes.EMP_FETCH_FAIL:
      return fetchFail(state, action.message, action.intersecting);
    case actionTypes.EMP_INIT_ERR:
      return { ...state, errorMs: null };
    case actionTypes.EMP_RANK_PERIOD:
    //return ;
    case actionTypes.EMP_RANK_SALARY:
    //return;
    case actionTypes.EMP_HISTORY:
    //return;
    case actionTypes.EMP_ADD_PAGE:
      return addPage();
    case actionTypes.EMP_INIT_BOARD:
      return initBoard();
    case actionTypes.EMP_INIT_CATEGORY:
      return initCategory(state, action.category);
    default:
      return state;
  }
};

export default reducer;
