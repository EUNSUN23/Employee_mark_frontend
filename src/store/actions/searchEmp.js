import axios from "axios";
import { saveCurrent } from "../../shared/utility";
import * as actionTypes from "./actionTypes";

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

const setEmployeeData = (data, intersecting, page) => {
  return {
    type: actionTypes.EMP_SET_DATA,
    employeeData: data,
    intersecting: intersecting,
    page: page,
  };
};

export const fetchStart = (intersecting) => {
  return { type: actionTypes.EMP_FETCH_START, intersecting: intersecting };
};

// const addPage = () => {
//   return { type: actionTypes.EMP_ADD_PAGE };
// };

// const initBoard = () => {
//   return { type: actionTypes.EMP_INIT_BOARD };
// };

const fetchFail = (message) => {
  return { type: actionTypes.EMP_FETCH_FAIL, message: message };
};

export const getEmpData = (selected, page, isIntersected) => {
  let employees;
  const intersecting = isIntersected === "intersected";
  const isOptionVal =
    selected.category && selected.category !== "name" ? true : false;
  const page_no = intersecting ? page + 1 : page;
  const url = isOptionVal
    ? `http://localhost:3008/api/emp/${selected.category}/${selected.value}/${page_no}`
    : `http://localhost:3008/api/emp/${selected}/${page_no}`;

  console.log(url);
  const current = isOptionVal
    ? selected
    : { category: "name", value: selected };

  return async (dispatch) => {
    dispatch(fetchStart(intersecting));
    try {
      const res = await axios.get(url);
      employees = res.data.packet;
    } catch (err) {
      dispatch(fetchFail(err.response.status));
    }
    if (!employees) return;
    saveCurrent(current);
    dispatch(setEmployeeData(employees, intersecting, page));
  };
};

export const initError = () => {
  return { type: actionTypes.EMP_INIT_ERR };
};
