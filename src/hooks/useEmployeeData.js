import React, { useState } from "react";

const useEmployeeData = () => {
  const [dataType, setDataType] = useState(null);
  const [data, setData] = useState();

  const changeDataType = (type) => {
    setDataType(type);
  };

  const getData = (data) => {
    //axios로 history data요청.
    setData(data);
  };

  return [{ type: dataType, data: data }, changeDataType, getData];
};

export default useEmployeeData;
