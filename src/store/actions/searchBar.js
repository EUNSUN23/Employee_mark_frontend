import * as actionTypes from "../actions/actionTypes";
import axios from "axios";

// <-- setCategory -->

const initCategory = (data) => {
  return {
    type: actionTypes.BAR_INIT_CATEGORY,
    category: data,
    loading: false,
  };
};

const getDeptAPI = async () => {
  const deptRes = await axios.get("http://localhost:3008/api/dept");

  return deptRes.data.packet;
};

const getTitleAPI = async () => {
  const titleRes = await axios.get("http://localhost:3008/api/title");

  return titleRes.data.packet;
};

const getCategoryAPI = async () => {
  const res = await Promise.all([getDeptAPI(), getTitleAPI()]);
  return { dept: res[0], title: res[1] };
};

const fetchStart = () => {
  return { type: actionTypes.BAR_FETCH_START };
};

const fetchCategoryFail = (message) => {
  return { type: actionTypes.BAR_FETCH_FAIL, message: message, loading: false };
};

export const setCategory = () => {
  return async (dispatch) => {
    let category;
    let res;
    dispatch(fetchStart());
    try {
      res = await getCategoryAPI();
    } catch (err) {
      dispatch(fetchCategoryFail(err.response.status));
    }

    if (!res) return;

    const deptList = res.dept.map((obj, idx) => {
      return obj.dept_name;
    });

    const titleList = res.title.map((obj, idx) => {
      return obj.title;
    });

    category = {
      dept: deptList,
      title: titleList,
    };
    dispatch(initCategory(category));
  };
};

// <-- setOption -->

export const setOption = (option) => {
  return { type: actionTypes.BAR_SET_OPTION, option: option };
};

// <-- setValue -->

export const setOptVal = (selected) => {
  return { type: actionTypes.BAR_OPT_VAL, selected: selected };
};

export const setInpVal = (name) => {
  return { type: actionTypes.BAR_INP_VAL, name: name };
};

export const initOptVal = () => {
  return { type: actionTypes.BAR_INIT_OPT };
};
