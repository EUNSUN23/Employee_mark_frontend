import * as actionTypes from "./actionTypes";

export const setDetail = (detail) => {
  return { type: actionTypes.STAT_BAR_DETAIL, detail: detail };
};

export const setArea = (area) => {
  return { type: actionTypes.STAT_BAR_AREA, area: area };
};

export const setSelected = (selected) => {
  return { type: actionTypes.STAT_BAR_SELECT, selected: selected };
};

export const initArea = () => {
  return { type: actionTypes.STAT_INIT_AREA };
};

export const setDataSent = (type) => {
  if (type === "dept") return { type: actionTypes.STAT_DEPT_SENT };
  if (type === "emp") return { type: actionTypes.STAT_EMP_SENT };
};
