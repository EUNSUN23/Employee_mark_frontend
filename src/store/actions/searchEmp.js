import axios from "axios";
import { saveCurrent, setSearchEmpApi } from "../../shared/utility";
import * as actionTypes from "./actionTypes";

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

const setEmployeeData = (data, intersecting) => {
  return {
    type: actionTypes.EMP_SET_DATA,
    employeeData: data,
    intersecting: intersecting,
  };
};

export const fetchStart = (intersecting) => {
  return { type: actionTypes.EMP_FETCH_START, intersecting: intersecting };
};

const addPage = () => {
  return { type: actionTypes.EMP_ADD_PAGE };
};

const initBoard = () => {
  return { type: actionTypes.EMP_INIT_BOARD };
};

const fetchFail = (message) => {
  return { type: actionTypes.EMP_FETCH_FAIL, message: message };
};

export const getEmpData = (selected, page, isIntersected) => {
  let employees;

  const intersecting = isIntersected === "intersected";
  const page_no = intersecting ? page + 1 : page;
  const url = setSearchEmpApi(selected, page_no);
  const current = selected;

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
    intersecting ? dispatch(addPage()) : dispatch(initBoard());
    dispatch(setEmployeeData(employees, intersecting));
  };
};

export const initError = () => {
  return { type: actionTypes.EMP_INIT_ERR };
};

export const searchError = (message) => {
  return { type: actionTypes.EMP_SEARCH_ERROR, message: message };
};

export const setOpenedEmp = (info) => {
  return { type: actionTypes.EMP_SET_OPENED, info: info };
};
