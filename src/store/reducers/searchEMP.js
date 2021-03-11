import * as actionTypes from "../actions/actionTypes";
import {
  setEmployeeData,
  fetchFail,
  addPage,
  initBoard,
  initCategory,
} from "../../shared/utility";

import { getEmpByName, getEmpByCategory } from "../actions/searchEMP";

const initState = {
  employeeData: null,
  searchCategory: null,
  loading: false,
  nextLoading: false,
  errorMs: null,
  page: 1,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.EMP_INIT_CATEGORY:
      return initCategory(state, action.category);
    case actionTypes.EMP_SEARCH_NAME:
      return getEmpByName(state, action.payload);
    case actionTypes.EMP_SEARCH_CATEGORY:
      return getEmpByCategory(state, action.payload);
    case actionTypes.EMP_SET_DATA:
      return setEmployeeData(state, action.employeeData, action.intersecting);
    case actionTypes.EMP_FETCH_START:
      const loading = action.intersecting ? "nextLoading" : "loading";
      return { ...state, [loading]: false };
    case actionTypes.EMP_FETCH_FAIL:
      return fetchFail(state, action.message, action.intersecting);
    case actionTypes.EMP_INIT_ERR:
      return { ...state, errorMs: null };
    case actionTypes.EMP_ADD_PAGE:
      return addPage();
    case actionTypes.EMP_INIT_BOARD:
      return initBoard();

    default:
      return state;
  }
};

export default reducer;
