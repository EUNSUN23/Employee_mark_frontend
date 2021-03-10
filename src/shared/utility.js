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
  if (prevData) {
    const lastId = prevData[prevData.length - 1].id;
    const newData = data.map((el, idx) => ({
      employee: el,
      id: lastId + idx + 1,
    }));
    const loading = intersecting ? "nextLoading" : "loading";
    updatedData = prevData.concat(newData);
    updatedObj = { employeeData: updatedData, [loading]: true };
  } else {
    updatedData = data.map((el, idx) => ({
      employee: el,
      id: lastId + idx + 1,
    }));
    updatedObj = { employeeData: updatedData, loading: true };
    console.log("updatedData", updatedData);
  }

  console.log("updatedObject", updateObject(state, updatedObj));

  return updateObject(state, updatedObj);
};
