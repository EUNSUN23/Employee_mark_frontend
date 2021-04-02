import * as actionTypes from "../actions/actionTypes";
import { setEmp, setEmpError } from "../../shared/utility";

const initState = {
  emp: null,
  loading: false,
  errorMs: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.HOME_SET_EMP:
      return setEmp(state, action.emp, action.loading);
    case actionTypes.HOME_FETCH_START:
      return { ...state, loading: true };
    case actionTypes.HOME_FETCH_FAIL:
      return setEmpError(state, action.message, action.loading);
    default:
      return state;
  }
};

export default reducer;
