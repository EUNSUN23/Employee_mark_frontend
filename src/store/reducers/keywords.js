import * as actionTypes from "../actions/actionTypes";
import {
  initKeywords,
  addKeywords,
  deleteKeywords,
  openKeywords,
} from "../../shared/utility";

const initState = {
  keywords: [],
  open: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.KEYWORDS_INIT:
      return initKeywords(state, action.storage);
    case actionTypes.KEYWORDS_ADD:
      return addKeywords(state, action.keywords);
    case actionTypes.KEYWORDS_DELETE:
      return deleteKeywords(state, action.keywords);
    case actionTypes.KEYWORDS_OPEN:
      return openKeywords(state, action.bool);
    default:
      return state;
  }
};

export default reducer;
