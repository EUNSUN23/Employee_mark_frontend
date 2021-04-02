import axios from "axios";
import * as actionTypes from "./actionTypes";

const setDept = (dept) => {
  return { type: actionTypes.HOME_SET_DEPT, dept: dept, loading: false };
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
      data = await getEmpAPI();
    } catch (err) {
      console.log(err.response.status);
    }
    if (!data) return;
    dispatch(setDept(data));
  };
};
