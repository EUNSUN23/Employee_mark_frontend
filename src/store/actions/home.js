import axios from "axios";
import * as actionTypes from "./actionTypes";

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

export const getEmpAPI = async () => {
  const res = await Promise.all([getDeptEmp(), getTitleEmp()]);

  const deptEmp = res[0].data.packet;

  const titleEmp = res[1].data.packet;

  return {
    dept: deptEmp,
    title: titleEmp,
  };
};

export const getTotalAPI = async () => {
  const res = await Promise.all([getTotalEmp(), getLeftEmp()]);
  const total = res[0].data.packet[0].count;
  const left = res[1].data.packet[0].count;
  return {
    total: total,
    left: left,
  };
};

const setEmp = (emp) => {
  return { type: actionTypes.HOME_SET_EMP, emp: emp, loading: false };
};

const setTotal = (total) => {
  return {
    type: actionTypes.HOME_SET_TOTAL,
    total: total.total,
    left: total.left,
    loading: false,
  };
};

export const getEmp = () => {
  return async (dispatch) => {
    let emp;
    let total;
    dispatch(empFetchStart());
    try {
      emp = await getEmpAPI();
      total = await getTotalAPI();
    } catch (err) {
      dispatch(empFetchFail(err.response.status));
    }

    if (emp && total) {
      dispatch(setEmp(emp));
      dispatch(setTotal(total));
    }
  };
};
