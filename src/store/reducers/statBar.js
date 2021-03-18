import * as actionTypes from "../actions/actionTypes";
import { setDetail, setArea, setSelected } from "../../shared/utility";

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
      return setArea(state, action.area);
    case actionTypes.STAT_BAR_SELECT:
      return setSelected(state, action.selected);
    default:
      return state;
  }
};

export default reducer;
