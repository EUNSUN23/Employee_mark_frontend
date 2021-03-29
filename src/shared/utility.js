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

export const initCategory = (state, data, loading) => {
  data.dept.unshift("dept");
  data.title.unshift("title");
  const updatedCategory = { category: data, loading: loading };
  return updateObject(state, updatedCategory);
};

export const categoryFetchFail = (state, message, loading) => {
  const failedCategory = { errorMs: message, loading: loading };
  return updateObject(state, failedCategory);
};

// <--------- STAT_BAR ---------------->

export const setStatOption = (state, option) => {
  const newOpt = { option: option };
  return updateObject(state, newOpt);
};

export const setDetail = (state, detail) => {
  const newDetail = { optionDetail: detail };
  return updateObject(state, newDetail);
};

export const setArea = (state, area) => {
  const newArea = { type: area.type, salary: area.salary };
  const updatedArea = { area: newArea };
  return updateObject(state, updatedArea);
};

export const initArea = (state) => {
  const initArea = { type: null, salary: null };
  const updatedArea = { area: initArea };
  return updateObject(state, updatedArea);
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

const setZeroData = (dataArr) => {
  const dataObj = new Set();
  const deptNameArr = [
    "Customer Service",
    "Development",
    "Finance",
    "Human Resources",
    "Marketing",
    "Production",
    "Quality Management",
    "Research",
    "Sales",
  ];

  for (let i = 0; i < deptNameArr.length; i++) {
    dataObj[deptNameArr[i]] = dataArr[i] ? dataArr[i].cnt : 0;
  }

  return dataObj;
};

const arrangeDist = (data) => {
  const dataObj = setZeroData(data);
  console.log("dataObj", dataObj);
  const arrangedData = Object.keys(dataObj).map((dept, idx) => ({
    name: dept,
    cnt: dataObj[dept],
  }));
  return arrangedData;
};

const arrangeStack = (resData) => {
  const deptArr = [
    "Customer Service",
    "Development",
    "Finance",
    "Human Resources",
    "Marketing",
    "Production",
    "Quality Management",
    "Research",
    "Sales",
  ];
  const dataObj = new Set();

  for (let i = 0; i < deptArr.length; i++) {
    const deptData = resData.filter((data, idx) => {
      return data.dept_name === deptArr[i];
    });

    deptData.sort((a, b) => a.sal - b.sal);

    for (let j = 0; j < 13; j++) {
      if (!deptData[j]) {
        deptData[j] = new Set();
        deptData[j].sal = 40000 + 10000 * j;
        deptData[j].cnt = 0;
      }
    }
    dataObj[deptArr[i]] = deptData;
  }

  return dataObj;
};

export const setStatData = (state, data, isLoading, type) => {
  let updatedData;

  switch (type) {
    case "emp":
      data.sort((a, b) => {
        return a.sal - b.sal;
      });
      const customized = data.map((data, idx) => {
        return { sal: `$${data.sal}`, emp: data.cnt };
      });
      updatedData = { empData: customized, loading: isLoading };
      return updateObject(state, updatedData);
    case "dept":
      const deptData = arrangeStack(data);
      console.log("deptData", deptData);
      updatedData = { deptData: deptData, loading: isLoading };
      return updateObject(state, updatedData);
    case "below":
      const belowData = arrangeDist(data);
      belowData.sort((a, b) => b.cnt - a.cnt);
      updatedData = { belowData: belowData, loading: isLoading };
      return updateObject(state, updatedData);
    case "above":
      const aboveData = arrangeDist(data);
      aboveData.sort((a, b) => b.cnt - a.cnt);
      updatedData = { aboveData: aboveData, loading: isLoading };
      return updateObject(state, updatedData);
    default:
      return;
  }
};

// <------------------ STACK CHART ----------------------->

export const setChartColor = (chartName, highlight) => {
  console.log(chartName);
  let chartColor;
  if (highlight) return "#E20830";
  switch (chartName) {
    case "Customer Service":
      chartColor = "#6DC3C1";
      return chartColor;
    case "Development":
      chartColor = "#F8B128 ";
      return chartColor;
    case "Finance":
      chartColor = "#FF8927 ";
      return chartColor;
    case "Human Resources":
      chartColor = "#2BA43E";
      return chartColor;
    case "Marketing":
      chartColor = "#AE8734";
      return chartColor;
    case "Production":
      chartColor = "#1968F0";
      return chartColor;
    case "Quality Management":
      chartColor = "#AB50E0  ";
      return chartColor;
    case "Research":
      chartColor = "#5BC34E ";
      return chartColor;
    case "Sales":
      chartColor = "#FAEB4D";
      return chartColor;
    default:
      return;
  }
};
