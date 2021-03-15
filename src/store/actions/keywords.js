import * as actionTypes from "./actionTypes";
import { getKeywords, setKeywords } from "../../shared/utility";

export const initKeywords = () => ({ type: actionTypes.KEYWORDS_INIT });

export const addKeywords = (category, value) => {
  const storage = getKeywords();
  const newKeyword = {
    category: category,
    index: Date.now(),
    value: value,
  };
  const added = storage
    ? storage.concat(newKeyword)
    : ["recent keyword", newKeyword];
  setKeywords(added);

  return { type: actionTypes.KEYWORDS_ADD, keywords: added };
};

export const deleteKeyword = (identifier) => ({
  type: actionTypes.KEYWORDS_DELETE,
  identifier: identifier,
});

export const openKeywords = (bool) => ({
  type: actionTypes.KEYWORDS_OPEN,
  bool: bool,
});
