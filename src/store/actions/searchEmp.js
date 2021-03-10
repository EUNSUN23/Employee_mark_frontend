import axios from "axios";
import * as actionTypes from "./actionTypes";

// const initBoard = useCallback(() => {
//     setEmployeeData(null);
//     initPage();
//   }, []);

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

const setEmployeeData = (data, intersecting) => {
    return { type:actionTypes.EMP_SET_DATA, employeeData:data, intersecting:intersecting}
 
}

const fetchEmployeeData = (intersecting) =>{
 // loading true로 
    return {type:actionTypes.EMP_FETCH_START, intersecting:intersecting};
}

const setPage = () => {
    return {type:actionTypes.EMP_SET_PAGE}
}

const initBoard = () => {
    return {type:actionTypes.EMP_INIT_BOARD}
}

const fetchFail = (message) => {
    return {type:actionTypes.EMP_FETCH_FAIL, message:message}
    //openDialog(err.response.status);
    //loading false
}

const getEmployeeData = async (url, intersecting) => {
 
  //데이터 받아오기
return (dispatch) =>{
    let res;
    try {
        dispatch(fetchEmployeeData(intersecting));
        console.log(url);
        res = await axios.get(url);
        if (!res.data.packet) return;
        intersecting ? dispatch(setPage()):dispatch(initBoard());
        dispatch(setEmployeeData(res.data.packet, intersecting));
      } catch (err) {
        console.log("catch error", err.response.status);
        dispatch(fetchFail(err.response.status));
      }
}
  
};

export const getEmpByName = (action) => {
  //action = {page:{page:1} 혹은 숫자, isIntersected: "intersected"/"unintersected"}
  const intersecting = action.isIntersected === "intersected";
  const page_no = intersecting ? action.page + 1 : action.page;
  const url = `http://localhost:3008/api/emp/${action.value}/${page_no}`;
 getEmployeeData(url, intersecting);
};

export const getEmpByCategory = (action) => {
  const intersecting = action.isIntersected === "intersected";
  const page_no = intersecting ? action.page + 1 : action.page;
  const url = `http://localhost:3008/api/emp/${data.category}/${data.value}/${page_no}`;
  getEmployeeData(url, intersecting);
};

export const initEmp = () => {};
