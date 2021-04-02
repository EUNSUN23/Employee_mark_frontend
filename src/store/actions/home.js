import axios from "axios";
import * as actionTypes from "./actionTypes";

const setEmp = (empData) => {
  return { type: actionTypes.HOME_SET_Emp, emp: empData, loading: false };
};

const empFetchStart = () => {
  return { type: actionTypes.HOME_FETCH_START };
};

const empFetchFail = (message) => {
  return {
    type: actionTypes.HOME_FETCH_FAIL,
    message: message,
    loading: false,
  };
};

const getDeptEmp = async () =>
  await axios.get("http://localhost:3008/api/emp/count/dept").data.packet;

const getTitleEmp = async () =>
  await axios.get("http://localhost:3008/api/emp/count/title").data.packet;

const getLeftEmp = async () =>
  await axios.get("http://localhost:3008/api/emp/count/title").data.packet;

const getTotalEmp = async () =>
  await axios.get("http://localhost:3008/api/emp/count/total").data.packet;

const getEmpAPI = async () => {
  const res = await Promise.all([
    getDeptEmp(),
    getTitleEmp(),
    getLeftEmp(),
    getTotalEmp(),
  ]);
  return { dept: res[0], title: res[1], left: res[2], total: res[3] };
};

export const getEmp = () => {
  return async (dispatch) => {
    let data;
    try {
      dispatch(empFetchStart());
      data = await getEmpAPI();
    } catch (err) {
      dispatch(empFetchFail(err.response.status));
    }
    if (!data) return;
    dispatch(setEmp(data));
  };
};
