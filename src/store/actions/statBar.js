import * as actionTypes from "./actionTypes";

export const setDetail = (detail) => {
  return { type: actionTypes.STAT_BAR_DETAIL, detail: detail };
};

export const setArea = (area) => {
  console.log("setArea action", area);
  return { type: actionTypes.STAT_BAR_AREA, area: area };
};

export const setSelected = (selected) => {
  return { type: actionTypes.STAT_BAR_SELECT, selected: selected };
};

export const initArea = () => {
  return { type: actionTypes.STAT_INIT_AREA };
};
