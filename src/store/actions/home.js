import axios from "axios";
import * as actionTypes from "./actionTypes";

const setEmp = (emp) => {
  return { type: actionTypes.HOME_SET_EMP, emp: emp };
};

const setTotal = (total) => {
  return {
    type: actionTypes.HOME_SET_TOTAL,
    total: total.total,
    left: total.left,
    loading: false,
  };
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

const getDeptEmp = async () => {
  return await axios.get("http://localhost:3008/api/emp/count/dept");
};

const getTitleEmp = async () => {
  return await axios.get("http://localhost:3008/api/emp/count/title");
};

const getTotalEmp = async () => {
  return await axios.get("http://localhost:3008/api/emp/total");
};

const getLeftEmp = async () => {
  return await axios.get("http://localhost:3008/api/emp/total/left");
};

const getEmpAPI = async () => {
  const res = await Promise.all([getDeptEmp(), getTitleEmp()]);

  const deptEmp = res[0].data.packet;

  const titleEmp = res[1].data.packet;

  return {
    dept: deptEmp,
    title: titleEmp,
  };
};

const getTotalAPI = async () => {
  const res = await Promise.all([getTotalEmp(), getLeftEmp()]);
  console.log("RES", res);
  const total = res[0].data.packet[0].count;
  const left = res[1].data.packet[0].count;
  return {
    total: total,
    left: left,
  };
};

export const getEmp = () => {
  return async (dispatch) => {
    let emp;
    let total;
    dispatch(empFetchStart());
    try {
      emp = await getEmpAPI();
      dispatch(setEmp(emp));
      total = await getTotalAPI();
      dispatch(setTotal(total));
    } catch (err) {
      dispatch(empFetchFail(err.response.status));
    }
  };
};
