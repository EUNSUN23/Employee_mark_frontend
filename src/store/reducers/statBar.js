import * as actionTypes from "../actions/actionTypes";
import { setDetail, setArea, setSelected } from "../../shared/utility";

const initState = {
  area: null,
  selected: null,
  isDeptSent: false,
  isAreaSent: false,
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
    case actionTypes.STAT_DEPT_SENT:
      return { ...state, isDeptSent: true };
    case actionTypes.STAT_AREA_SENT:
      return { ...state, isAreaSent: true };
    default:
      return state;
  }
};

export default reducer;
