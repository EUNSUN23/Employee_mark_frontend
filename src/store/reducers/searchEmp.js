import * as actionTypes from "../actions/actionTypes";
import {
  setEmployeeData,
  fetchFail,
  addPage,
  initBoard,
  setOpenedEmp,
} from "../../shared/utility";

const initState = {
  employeeData: null,
  searchCategory: null,
  loading: false,
  nextLoading: false,
  errorMs: null,
  page: 1,
  openedEmp: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.EMP_FETCH_START:
      const loading = action.intersecting ? "nextLoading" : "loading";
      return { ...state, [loading]: true };
    case actionTypes.EMP_SET_DATA:
      return setEmployeeData(state, action.employeeData, action.intersecting);
    case actionTypes.EMP_FETCH_FAIL:
      return fetchFail(state, action.message, action.intersecting);
    case actionTypes.EMP_INIT_ERR:
      return { ...state, errorMs: null };
    case actionTypes.EMP_ADD_PAGE:
      return addPage(state);
    case actionTypes.EMP_INIT_BOARD:
      return initBoard(state);
    case actionTypes.EMP_SEARCH_ERROR:
      const updatedErr = { errorMs: action.message };
      return { ...state, ...updatedErr };
    case actionTypes.EMP_SET_OPENED:
      return setOpenedEmp(state, action.info);
    default:
      return state;
  }
};

export default reducer;
