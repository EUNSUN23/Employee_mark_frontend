import * as actionTypes from "../actions/actionTypes";
import {
  initCategory,
  setOption,
  setOptVal,
  setInpVal,
  categoryFetchFail,
} from "../../shared/utility";

const initState = {
  category: null,
  option: "이름검색",
  optionVal: null,
  inputVal: null,
  loading: false,
  errorMs: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.BAR_INIT_CATEGORY:
      return initCategory(state, action.category, action.loading);
    case actionTypes.BAR_SET_OPTION:
      return setOption(state, action.option);
    case actionTypes.BAR_OPT_VAL:
      return setOptVal(state, action.selected);
    case actionTypes.BAR_INP_VAL:
      return setInpVal(state, action.name);
    case actionTypes.BAR_INIT_OPT:
      const initOpt = { optionVal: null };
      return { ...state, initOpt };
    case actionTypes.BAR_FETCH_START:
      const updatedLoading = { loading: true };
      return { ...state, ...updatedLoading };
    case actionTypes.BAR_FETCH_FAIL:
      return categoryFetchFail(state, action.message, action.loading);
    default:
      return state;
  }
};

export default reducer;
