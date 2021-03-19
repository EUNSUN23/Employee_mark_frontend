import axios from "axios";
import * as actionTypes from "./actionTypes";

const setDept = (dept) => {
  return { type: actionTypes.HOME_SET_DEPT, dept: dept, loading: false };
};

const left = await axios.get("http://localhost:3008/api/emp/total/left").data
  .packet;
const title = await axios.get("http://localhost:3008/api/emp/count/title").data
  .packet;

export const getDeptEmp = () => {
  return async (dispatch) => {
    let data;
    try {
      const dept = await axios.get("http://localhost:3008/api/emp/count/dept")
        .data.packet;
    } catch (err) {
      console.log(err.response.status);
    }
    if (!data) return;
    dispatch(setDept(data));
  };
};

const setTotal = (total) => {
  return;
};

export const getTotalEmp = () => {
  return async (dispatch) => {
    let data;
    try {
      data = await axios.get("http://localhost:3008/api/emp/count/total").data
        .packet;
    } catch (err) {
      console.log(err.response.status);
    }
    if (!data) return;
    dispatch(setTotal(data));
  };
};
