import * as actionTypes from "../actions/actionTypes";
import { setStatData, setLoading } from "../../shared/utility";

const initState = {
  empData: null,
  deptData: null,
  belowData: null,
  aboveData: null,
  loading: false,
  errorMs: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.STAT_FETCH_START:
      return setLoading(state, action.loading);
    case actionTypes.STAT_FETCH_FAIL:
      return setLoading(state, action.message, action.loading);
    case actionTypes.STAT_SET_DATA:
      return setStatData(state, action.data, action.loading, action.dataType);
    case actionTypes.STAT_INIT_ERROR:
      const initErrorMs = { errorMs: null };
      return { ...state, initErrorMs };
    default:
      return state;
  }
};

export default reducer;
