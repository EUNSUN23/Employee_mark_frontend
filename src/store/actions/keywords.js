import * as actionTypes from "./actionTypes";

export const initKeywords = () => ({ type: actionTypes.KEYWORDS_INIT });

export const addKeywords = (category, value) => ({
  type: actionTypes.KEYWORDS_ADD,
  category: category,
  keyword: value,
});

export const deleteKeyword = (identifier) => ({
  type: actionTypes.KEYWORDS_DELETE,
  identifier: identifier,
});

export const openKeywords = (bool) => ({
  type: actionTypes.KEYWORDS_OPEN,
  bool: bool,
});
