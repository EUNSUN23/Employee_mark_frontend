// <-- searchEmp -->

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const addPage = (state) => {
  const prevPage = state.page;
  const updatedPage = { page: prevPage + 1 };
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

  updatedObj = {
    employeeData: updatedData,
    [loading]: false,
  };

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

export const setOpenedEmp = (state, info) => {
  const empInfo = {
    emp_no: info.emp_no,
    dept_name: info.dept_name,
    title: info.title,
  };
  const updatedOpened = { openedEmp: empInfo };
  return updateObject(state, updatedOpened);
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
        return { sal: data.sal, emp: data.cnt };
      });
      updatedData = { empData: customized, loading: isLoading };
      return updateObject(state, updatedData);
    case "dept":
      const deptData = arrangeStack(data);
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

// <--------- HOME ----------->

export const setEmp = (state, emp) => {
  const updatedEmp = { emp: emp };
  return updateObject(state, updatedEmp);
};

export const setEmpError = (state, message, loading) => {
  const updatedError = { errorMs: message, loading: loading };
  return updateObject(state, updatedError);
};

export const setTotal = (state, total, left, loading) => {
  const updatedTotal = { total: total, left: left, loading: loading };
  return updateObject(state, updatedTotal);
};

//<------ 기타 ---------->

export const setSearchEmpApi = (selected, page_no) => {
  switch (selected.category) {
    case "name":
      return `http://localhost:3008/api/emp/${selected.value}/${page_no}`;
    case "dept":
      return `http://localhost:3008/api/emp/${selected.category}/${selected.value}/${page_no}`;
    case "title":
      return `http://localhost:3008/api/emp/${selected.category}/${selected.value}/${page_no}`;
    default:
      return;
  }
};

// * 시간 순으로 최근검색어 리스트 5개 만들기 *

export const createRecentList = (arr) => {
  if (arr.length <= 1) return [{ index: 0, value: "최근 검색내역이 없습니다" }];

  const recentItems = arr.slice(1);

  const sortedArr = recentItems.sort((a, b) => {
    return b.index - a.index;
  });

  const valueArr = sortedArr.map((el, idx) => {
    return el.value;
  });

  const reducedArr = valueArr.reduce((accumulator, current) => {
    const length = accumulator.length;
    if (length === 0 || accumulator.indexOf(current) <= -1) {
      current && accumulator.push(current);
    }
    return accumulator;
  }, []);

  return reducedArr.slice(0, 5).map((el, idx) => {
    const index = valueArr.indexOf(el);
    return {
      category: recentItems[index].category,
      value: el,
      index: recentItems[index].index,
    };
  });
};

// * 최근검색어 외 메뉴리스트 만들기 *

export const createOptions = (arr) => {
  return arr
    .map((el, idx) => ({ category: arr[0], index: idx, value: el }))
    .slice(1);
};

// * 연봉통계 detail title *

export const setStatTitle = (type) => {
  switch (type) {
    case "emp":
      return "전사 연봉 분포";
    case "dept":
      return "부서별 연봉 분포";
    case "area":
      return "상세 연봉별 부서순위";
    default:
      return;
  }
};
