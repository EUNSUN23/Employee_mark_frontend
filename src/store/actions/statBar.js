import * as actionTypes from "./actionTypes";

export const setOption = (option) => {
  return { type: actionTypes.STAT_BAR_OPTION, option: option };
};

export const setDetail = (detail) => {
  return { type: actionTypes.STAT_BAR_DETAIL, detail: detail };
};

export const setArea = (area) => {
  return { type: actionTypes.STAT_BAR_AREA, area: area };
};

export const setSelected = (selected) => {
  return { type: actionTypes.STAT_BAR_SELECT, selected: selected };
};
