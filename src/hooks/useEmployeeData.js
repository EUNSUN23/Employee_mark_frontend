import { useState } from "react";

const useEmployeeData = () => {
  const [dataType, setDataType] = useState(null);
  const [data, setData] = useState();

  /*패널 내부 데이터 종류 변경 */

  const changeDataType = (type) => {
    setDataType(type);
  };

  const getData = (data) => {
    //axios로 history data요청.
    console.log("GET panel data");

    setData(data);
  };

  return [{ type: dataType, data: data }, changeDataType, getData];
};

export default useEmployeeData;
