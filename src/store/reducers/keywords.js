import * as actionTypes from "../actions/actionTypes";
import {
  initKeywords,
  addKeywords,
  deleteKeywords,
} from "../../shared/utility";

const initState = ["recent keyword"];

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.KEYWORDS_INIT:
      return initKeywords(state);
    case actionTypes.KEYWORDS_ADD:
      return addKeywords(state, action.category, action.keyword);
    case actionTypes.KEYWORDS_DELETE:
      return deleteKeywords(state, action.identifier);
    default:
      return state;
  }
};

export default reducer;
