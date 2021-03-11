import axios from "axios";
import * as actionTypes from "./actionTypes";
import {saveCurrent} from "../../shared/utility";
import { StayCurrentPortrait } from "@material-ui/icons";


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

export const searchByName = (name,page) => {
  
  return {type:actionTypes.EMP_SEARCH_NAME, payload:name, page:page};
}

export const searchByCategory = (category,page) => {
  return {type:actionTypes.EMP_SEARCH_CATEGORY, payload:category, page:page};
}




const getEmployeeData = async (url, intersecting,current) => {
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
          saveCurrent(current);
          dispatch(setEmployeeData(res.data.packet, intersecting));
        } catch (err) {
          console.log("catch error", err.response.status);
          dispatch(fetchFail(err.response.status));
        }
  };}


//utility에 들어갈 함수 호출하는 함수

  
  export const getEmpByName = (name,page,isIntersected) => {
    const intersecting = isIntersected === "intersected";
    const page_no = intersecting ? page + 1 : page;
    const url = `http://localhost:3008/api/emp/${name}/${page_no}`;
    const current = {category:"name", value:name};
   getEmployeeData(url, intersecting, StayCurrentPortrait);
  };
  
  export const getEmpByCategory = (selected,page,isIntersected) => {
    const intersecting = isIntersected === "intersected";
    const page_no = intersecting ? page + 1 : page;
    const url = `http://localhost:3008/api/emp/${selected.category}/${selected.value}/${page_no}`;
    const current = selected;
    getEmployeeData(url, intersecting, current);
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

