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

// <--------- STAT_BAR ---------------->

export const setStatOption = (state, option) => {
  const newOpt = { option: option };
  return updateObject(state, newOpt);
};

export const setDetail = (state, detail) => {
  const newDetail = { detail: detail };
  return updateObject(state, newDetail);
};

export const setArea = (state, area) => {
  const newArea = { area: area };
  return updateObject(state, newArea);
};

export const setSelected = (state, selected) => {
  const newSelected = { selected: selected };
  return updateObject(state, newSelected);
};

// <--------------- STAT PAGE ------------------>

export const setLoading = (state, isLoading) => {
  const updatedLoading = { loading: isLoading };
  return updateObject(state, updatedLoading);
};

const arrangeStack = (resData) => {
  const dataArr = [];
  let arrangedData;

  for (let i = 0; i < 13; i++) {
    const salaryData = resData.filter(
      (data, idx) => data.sal === 40000 + 10000 * i
    );

    dataArr.push(salaryData);
  }

  arrangedData = dataArr.map((data, idx) => {
    const dataObj = new Set();
    const deptNameArr = data.map((data, idx) => {
      return data.dept_name;
    });
    dataObj.name = `${data[0].sal / 10000}만`;
    const dataCount = deptNameArr.length; //9,8,6..등
    for (let i = 0; i < dataCount; i++) {
      dataObj[deptNameArr[i]] = data[i].cnt;
    }

    return dataObj;
  });

  return arrangedData;
};

export const setStatData = (state, data, isLoading) => {
  let chartData;
  let updatedData;

  switch (data.type) {
    case "emp":
      chartData = arrangeStack(data);
      updatedData = { empData: chartData, loading: isLoading };
      return updateObject(state, updatedData);
    case "dept":
      chartData = arrangeStack(data);
      updatedData = { deptData: chartData, loading: isLoading };
      return updateObject(state, updatedData);
    case "below":
      return;
    case "above":
      return;
    default:
      return;
  }
};

// <------------------ STACK CHART ----------------------->

export const setChartColor = (chartName) => {
  console.log(chartName);
  let chartColor;
  switch (chartName) {
    case "Customer Service":
      chartColor = "red";
      return chartColor;
    case "Development":
      chartColor = "orange";
      return chartColor;
    case "Finance":
      chartColor = "salmon";
      return chartColor;
    case "Human Resources":
      chartColor = "green";
      return chartColor;
    case "Marketing":
      chartColor = "blue";
      return chartColor;
    case "Production":
      chartColor = "skyblue";
      return chartColor;
    case "Quality Management":
      chartColor = "purple";
      return chartColor;
    case "Research":
      chartColor = "plum";
      return chartColor;
    case "Sales":
      chartColor = "palegreen";
      return chartColor;
    default:
      return;
  }
};
