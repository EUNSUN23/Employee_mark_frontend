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
      return { ...state, errorMs: null };
    case actionTypes.STAT_INIT_DIST:
      const initDist = { belowData: null, aboveData: null };
      return { ...state, ...initDist };
    default:
      return state;
  }
};

export default reducer;
