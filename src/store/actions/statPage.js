import * as actionTypes from "./actionTypes";
import { initError } from "./searchEMP";

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

const setStatData = (data) => {
  return { type: actionTypes.STAT_SET_DATA, data: data, loading: false };
};

export const getStatAPI = () => {
  return async (dispatch) => {
    let res;
    try {
      dispatch(fetchStart());
      res = await 어쩌구;
    } catch (err) {
      dispatch(fetchFail(err.response.status));
    }
    if (!res) return;
    const result = res.data.packet;
    dispatch(setStatData(result));
  };
};

export const initError = () => {
  return { type: actionTypes.STAT_INIT_ERROR };
};
