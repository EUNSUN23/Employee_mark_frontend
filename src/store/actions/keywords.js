import * as actionTypes from "./actionTypes";
import { getKeywords, setKeywords } from "../../shared/utility";

export const initKeywords = () => {
  return (dispatch) => {
    const storage = getKeywords();
    if (!storage) return;
    dispatch({ type: actionTypes.KEYWORDS_INIT, storage: storage });
  };
};

export const addKeywords = (category, value) => {
  return (dispatch, getState) => {
    const newKeyword = {
      category: category,
      index: Date.now(),
      value: value,
    };

    const currentKeyword = getState().keywords.keywords;

    const addedStorage = currentKeyword.concat(newKeyword);
    setKeywords(addedStorage.slice(1));

    dispatch({ type: actionTypes.KEYWORDS_ADD, keywords: addedStorage });
  };
};

export const deleteKeyword = (identifier) => {
  return (dispatch) => {
    const storage = getKeywords();

    const deletedStorage = storage.filter((el, idx) => {
      return el.index !== identifier;
    });

    setKeywords(deletedStorage);

    const deleted = ["recent keyword", ...deletedStorage];

    dispatch({
      type: actionTypes.KEYWORDS_DELETE,
      keywords: deleted,
    });
  };
};

export const openKeywords = (bool) => ({
  type: actionTypes.KEYWORDS_OPEN,
  bool: bool,
});
