import axios from "axios";
import * as actionTypes from "./actionTypes";


export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

const setEmployeeData = (data, intersecting) => {
    return { type:actionTypes.EMP_SET_DATA, employeeData:data, intersecting:intersecting}
 
}

export const fetchEmployeeData = (intersecting) =>{
    return {type:actionTypes.EMP_FETCH_START, intersecting:intersecting};
}

const addPage = () => {
    return {type:actionTypes.EMP_ADD_PAGE}
}

const initBoard = () => {
    return {type:actionTypes.EMP_INIT_BOARD}
}

const fetchFail = (message) => {
    return {type:actionTypes.EMP_FETCH_FAIL, message:message}
}


const getEmployeeData = async (url, intersecting) => {
return (dispatch) =>{
    let res;
    try {
        dispatch(fetchEmployeeData(intersecting));
        console.log(url);
        res = await axios.get(url);
        if (!res.data.packet) return;
        if(intersecting !== "noPage"){
          intersecting ? dispatch(addPage()):dispatch(initBoard());
        }
        dispatch(setEmployeeData(res.data.packet, intersecting));
      } catch (err) {
        console.log("catch error", err.response.status);
        dispatch(fetchFail(err.response.status));
      }
};}

export const getEmpByName = (action) => {
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

const initCategory = (data) => {
  return {type:actionTypes.EMP_INIT_CATEGORY, category:data}
}

const getDeptAPI = async () => {
  const deptRes = await axios.get("http://localhost:3008/api/dept");
  return deptRes.data.packet;
}

const getTitleAPI = async()=>{
  const titleRes = await axios.get("http://localhost:3008/api/title");
  return titleRes.data.packet;
}

export const getEmployeeAPI = async () => {
  return Promise.all([getDeptAPI, getTitleAPI]).then((res)=>{return {dept:res[0], title:res[1]}})
}

export const setCategory = async () => {
return (dispatch) => {
  let category;
  try{
    const res = await getEmployeeAPI();
    const dept = res.dept.map((obj)=>{return obj.dept_name}).unshift("dept");
    const title = res.title.map((obj)=>{return obj.title}).unshift("title");
    category = {dept:dept, title:title};
    console.log("CATEGORY", category);
    dispatch(initCategory(category));
  }catch(err){
    console.log(err);
  }
};}

