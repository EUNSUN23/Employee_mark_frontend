import * as actionTypes from "../actions/actionTypes";

const initState = {
  employeeData: null,
  loading: false,
  nextLoading: false,
};

// const EMP_GET_CATEGORY = "EMP_GET_CATEGORY";
// const EMP_SEARCH_NAME = "EMP_SEARCH_NAME";
// const EMP_SEARCH_DEPT = "EMP_SEARCH_DEPT";
// const EMP_SEARCH_TITLE = "EMP_SEARCH_TITLE";
// const EMP_SET_DATA = "EMP_SET_DATA";
//const EMP_FETCH_FAIL = "EMP_FETCH_FAIL";

// const EMP_RANK_PERIOD = "EMP_RANK_PERIOD";
// const EMP_RANK_SALARY = "EMP_RANK_SALARY";
// const EMP_HISTORY = "EMP_HISTORY";

const setEmployeeData = (state, data) => {};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.EMP_GET_CATEGORY:
    //return ;
    case actionTypes.EMP_SEARCH_NAME:
    //return ;
    case actionTypes.EMP_SEARCH_CATEGORY:
    //return;
    case actionTypes.EMP_SET_DATA:

    //return ;
    case actionTypes.EMP_FETCH_FAIL:
    //return ;
    case actionTypes.SEARCH_RANK_PERIOD:
    //return ;
    case actionTypes.SEARCH_RANK_SALARY:
    //return;
    case actionTypes.SEARCH_HISTORY:
    //return;
    default:
      return state;
  }
};

export default reducer;
