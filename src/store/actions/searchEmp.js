import axios from "axios";
import * as actionTypes from "./actionTypes";

// const initBoard = useCallback(() => {
//     setEmployeeData(null);
//     initPage();
//   }, []);

const setEmployeeData = (data, intersecting) => {
    return { type:actionTypes.EMP_SET_DATA, employeeData:data, intersecting:intersecting}
    //EMP_SET_DATA 액션 시 loading을 false로 바꿔줘야 함. 
    //이전 데이터와 이어붙이는 작업 해주기. 
    //   return setEmployeeData((prevData) => {
    //     let updatedData;
    //     if (prevData) {
    //       const lastId = prevData[prevData.length - 1].id;
    //       const newData = employeeList.map((el, idx) => ({
    //         employee: el,
    //         id: lastId + idx + 1,
    //       }));
    //       updatedData = prevData.concat(newData);
    //     } else {
    //       updatedData = employeeList.map((el, idx) => ({
    //         employee: el,
    //         id: idx,
    //       }));
    //       console.log("UPDATED_DATA", updatedData);
    //     }

    //     return updatedData;
    //   });
}

const fetchEmployeeData = (intersecting) =>{
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
    //setLoader(false);
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

export const getEmpByName = (state, action) => {
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
