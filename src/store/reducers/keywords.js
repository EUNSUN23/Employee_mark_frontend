import * as actionTypes from "../actions/actionTypes";

const initState = ["recent keyword"];

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.KEYWORDS_INIT:
    //initKeywords(state);
    case actionTypes.KEYWORDS_ADD:
    //addKeywords(state, action);
    case actionTypes.KEYWORDS_DELETE:
    //deleteKeywords(state,action);
    default:
      return state;
  }
};

export default reducer;
