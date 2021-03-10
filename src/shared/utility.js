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
      id: lastId + idx + 1,
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
