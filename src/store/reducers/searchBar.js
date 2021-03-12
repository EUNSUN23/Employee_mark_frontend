import * as actionTypes from "../actions/actionTypes";
import {
  initCategory,
  setOption,
  setOptVal,
  setInpVal,
} from "../../shared/utility";

const initState = {
  category: null,
  option: "이름검색",
  optionVal: null,
  inputVal: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.BAR_INIT_CATEGORY:
      return initCategory(state, action.category);
    case actionTypes.BAR_SET_OPTION:
      return setOption(state, action.option);
    case actionTypes.BAR_OPT_VAL:
      return setOptVal(state, action.selected);
    case actionTypes.BAR_INP_VAL:
      return setInpVal(state, action.name);
    case actionTypes.BAR_INIT_OPT:
      const initOpt = { optionVal: null };
      return { ...state, initOpt };
    default:
      return state;
  }
};

export default reducer;
