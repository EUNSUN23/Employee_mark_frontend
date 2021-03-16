import * as actionTypes from "./actionTypes";
import { getKeywords, setKeywords } from "../../shared/utility";

export const initKeywords = () => {
  return (dispatch) => {
    const storage = getKeywords();
    console.log("storage", storage);
    if (!storage) return;
    dispatch({ type: actionTypes.KEYWORDS_INIT, storage: storage });
  };
};

export const addKeywords = (category, value) => {
  return (dispatch) => {
    const storage = getKeywords();
    const newKeyword = {
      category: category,
      index: Date.now(),
      value: value,
    };
    const addedStorage = storage ? storage.concat(newKeyword) : newKeyword;
    setKeywords(addedStorage);

    const added = ["recent keyword", ...addedStorage];

    dispatch({ type: actionTypes.KEYWORDS_ADD, keywords: added });
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
