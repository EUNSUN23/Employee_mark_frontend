// <-- board -->

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const setEmployeeData = (state, data, intersecting) => {
  const prevState = [...state];
  const prevData = prevState.employeeData;
  let updatedData;
  let updatedObj;
  let loading;
  if (prevData) {
    const lastId = prevData[prevData.length - 1].id;
    const newData = data.map((el, idx) => ({
      employee: el,
      id: lastId + idx + 1,
    }));

    loading = intersecting && loading !== "noPage" ? "nextLoading" : "loading";

    updatedData = prevData.concat(newData);
    updatedObj = { employeeData: updatedData, [loading]: false };
  } else {
    updatedData = data.map((el, idx) => ({
      employee: el,
      id: idx,
    }));
    updatedObj = { employeeData: updatedData, loading: false };
    console.log("updatedData", updatedData);
  }

  console.log("updatedObject", updateObject(state, updatedObj));

  return updateObject(state, updatedObj);
};

export const fetchFail = (state, message, intersecting) => {
  const loading = intersecting ? "nextLoading" : "loading";
  const updatedObj = { errorMs: message, [loading]: false };
  return updateObject(state, updatedObj);
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

export const initCategory = (state, data) => {
  const updatedCategory = { searchCategory: data };
  return updateObject(state, updatedCategory);
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

const getKeywords = () => {
  return JSON.parse(localStorage.getItem("RECENT"));
};

const setKeywords = (data) => {
  return localStorage.setItem("RECENT", JSON.stringify(data));
};

export const initKeywords = (state) => {
  const storage = getKeywords();
  if (!storage || state.length !== 1) return;
  const updatedKeywords = { keywords: state.keywords.concat(storage) };
  return updateObject(state, updatedKeywords);
};

export const addKeywords = (state, action) => {
  const storage = getKeywords();
  const newKeyword = {
    category: action.category,
    index: Date.now(),
    value: action.keyword,
  };
  const addedState = state.keywords.concat(newKeyword);
  if (storage === null) {
    setKeywords(addedState.slice());
  } else {
    const addedStorage = storage.slice();
    addedStorage.push(newKeyword);
    setKeywords(addedStorage);
  }

  return addedState;
};

export const deleteKeywords = (state, identifier) => {
  const storage = getKeywords();
  console.log("DELETE", identifier);
  const deletedKeywords = state.keywords.filter((el, idx) => {
    return el.index !== identifier;
  });

  const updatedKeywords = { keywords: deletedKeywords };

  console.log("deletedKeywords", deletedKeywords);
  const deletedStorage = storage.filter((el, idx) => {
    return el.index !== identifier;
  });
  setKeywords(deletedStorage);
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
