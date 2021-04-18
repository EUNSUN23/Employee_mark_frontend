import * as actionTypes from "./actionTypes";
import { setDataSent } from "../actions/statBar";
import axios from "axios";

const fetchStart = () => {
  return { type: actionTypes.STAT_FETCH_START, loading: true };
};

const fetchFail = (message) => {
  return {
    type: actionTypes.STAT_FETCH_FAIL,
    message: message,
    loading: false,
  };
};

const setStatData = (data, type) => {
  return {
    type: actionTypes.STAT_SET_DATA,
    data: data,
    loading: false,
    dataType: type,
  };
};

export const getStatAPI = (data) => {
  return async (dispatch) => {
    let res;
    let url;
    if (data.type === "emp") {
      url = `http://localhost:3008/api/stat/distribution/emp/salary`;
    } else if (data.type === "dept") {
      url = `http://localhost:3008/api/stat/distribution/dept/salary`;
    } else if (data.type === "below") {
      url = `http://localhost:3008/api/stat/distribution/below/${data.salary}`;
    } else if (data.type === "above") {
      url = `http://localhost:3008/api/stat/distribution/above/${data.salary}`;
    }

    try {
      dispatch(fetchStart());
      res = await axios.get(url);
    } catch (err) {
      dispatch(fetchFail(err.response.status));
    }
    if (!res) return;
    const result = res.data.packet;
    dispatch(setStatData(result, data.type));

    return async (dispatch) => {
      dispatch(setDataSent(data.type));
    };
  };
};

export const initError = () => {
  return { type: actionTypes.STAT_INIT_ERROR };
};

export const initDist = () => {
  return { type: actionTypes.STAT_INIT_DIST };
};
