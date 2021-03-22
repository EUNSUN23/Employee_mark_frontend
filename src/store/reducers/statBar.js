import * as actionTypes from "../actions/actionTypes";
import {
  setDetail,
  setArea,
  setSelected,
  initArea,
} from "../../shared/utility";

const initState = {
  optionDetail: null,
  area: null,
  selected: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.STAT_BAR_DETAIL:
      return setDetail(state, action.detail);
    case actionTypes.STAT_BAR_AREA:
      console.log("setArea", action.area);
      return setArea(state, action.area);
    case actionTypes.STAT_BAR_SELECT:
      return setSelected(state, action.selected);
    case actionTypes.STAT_INIT_AREA:
      return { ...state, area: null };
    default:
      return state;
  }
};

export default reducer;
