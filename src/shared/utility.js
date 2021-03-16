// <-- board -->

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const addPage = (state) => {
  const prevPage = state.page;
  const updatedPage = { page: prevPage + 1 };
  console.log("updatedPage", updatedPage);
  return updateObject(state, updatedPage);
};

export const initBoard = (state) => {
  const initialEmp = { employeeData: null, page: 1 };
  return updateObject(state, initialEmp);
};

export const setEmployeeData = (state, data, intersecting) => {
  const prevData = state.employeeData;
  let updatedData;
  let updatedObj;
  let loading;
  if (intersecting) {
    const lastId = prevData[prevData.length - 1].id;
    const nextData = data.map((el, idx) => ({
      employee: el,
      id: lastId + idx + 1,
    }));
    updatedData = prevData.concat(nextData);
    loading = "nextLoading";
  } else {
    updatedData = data.map((el, idx) => ({
      employee: el,
      id: idx,
    }));

    loading = "loading";
  }
  console.log("loading", loading);
  updatedObj = {
    employeeData: updatedData,
    [loading]: false,
  };
  console.log("updatedObject", updateObject(state, updatedObj));

  return updateObject(state, updatedObj);
};

export const fetchFail = (state, message, intersecting) => {
  const loading = intersecting ? "nextLoading" : "loading";
  const updatedObj = { errorMs: message, [loading]: false };
  return updateObject(state, updatedObj);
};

export const isValid = (data) => {
  if (!data) {
    window.alert("검색어를 입력하세요");
    return;
  }
};

// <-- keywords -->

export const saveCurrent = (data) => {
  localStorage.setItem("CURRENT_KEY", JSON.stringify(data));
};

export const getCurrent = () => {
  const current = JSON.parse(localStorage.getItem("CURRENT_KEY"));
  return current;
};

export const getKeywords = () => {
  const keywords = JSON.parse(localStorage.getItem("RECENT"));
  return keywords;
};

export const setKeywords = (data) => {
  return localStorage.setItem("RECENT", JSON.stringify(data));
};

export const initKeywords = (state, storage) => {
  const updatedKeywords = { keywords: ["recent keyword", ...storage] };
  return updateObject(state, updatedKeywords);
};

export const addKeywords = (state, keywords) => {
  const updatedKeywords = { keywords: keywords };
  console.log("addedKeywords", updatedKeywords);
  return updateObject(state, updatedKeywords);
};

export const deleteKeywords = (state, keywords) => {
  const updatedKeywords = { keywords: keywords };

  return updateObject(state, updatedKeywords);
};

export const openKeywords = (state, bool) => {
  const updatedOpen = { open: bool };
  return updateObject(state, updatedOpen);
};

//<-- BAR -->

export const setOption = (state, option) => {
  const updatedOpt = { option: option };
  return updateObject(state, updatedOpt);
};

export const setOptVal = (state, selected) => {
  const updatedOptVal = { optionVal: selected };
  return updateObject(state, updatedOptVal);
};

export const setInpVal = (state, name) => {
  const updatedInpVal = { inputVal: name };
  return updateObject(state, updatedInpVal);
};

export const initCategory = (state, data) => {
  data.dept.unshift("dept");
  data.title.unshift("title");
  const updatedCategory = { category: data };
  return updateObject(state, updatedCategory);
};
