import { useState } from "react";
import axios from "axios";

const useEmployeeData = () => {
  const [dataType, setDataType] = useState(null);
  const [data, setData] = useState();

  /*패널 내부 데이터 종류 변경 */

  const getApiData = async (type, emp_no) => {
    let res;
    console.log("get api");
    try {
      const url = `http://localhost:3008/api/emp/history?emp_no=${emp_no}`;
      console.log(url);
      res = await axios.get(url);
      if (res) {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const changeDataType = (type) => {
    setDataType(type);
  };

  const getData = (type, emp_no) => {
    //axios로 history data요청.

    getApiData(type, emp_no);
    console.log("GET panel data");
    // setData();
  };

  return [{ type: dataType, data: data }, changeDataType, getData];
};

export default useEmployeeData;
