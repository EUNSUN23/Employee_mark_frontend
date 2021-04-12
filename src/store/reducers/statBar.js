import * as actionTypes from "../actions/actionTypes";
import { setDetail, setArea, setSelected } from "../../shared/utility";

const initState = {
  area: null,
  selected: null,
  isDeptSent: false,
  isEmpSent: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.STAT_BAR_DETAIL:
      return setDetail(state, action.detail);
    case actionTypes.STAT_BAR_AREA:
      return setArea(state, action.area);
    case actionTypes.STAT_BAR_SELECT:
      return setSelected(state, action.selected);
    case actionTypes.STAT_INIT_AREA:
      return { ...state, area: null };
    case actionTypes.STAT_DEPT_SENT:
      return { ...state, isDeptSent: true };
    case actionTypes.STAT_EMP_SENT:
      return { ...state, isEmpSent: true };
    default:
      return state;
  }
};

export default reducer;
