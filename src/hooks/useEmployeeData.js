import { useState } from "react";
import axios from "axios";

const useEmployeeData = () => {
  const [dataType, setDataType] = useState(null);
  const [data, setData] = useState();

  /*패널 내부 데이터 종류 변경 */

  const getApiData = async (type, emp_no, dept_name, title) => {
    let res;
    console.log("get api", dept_name, title);
    try {
      const url = `http://localhost:3008/api/emp/${type}`;
      console.log(url);
      res = await axios.post(url, {
        emp_no,
        dept_name,
        title,
      });
      if (res) {
        console.log("RESPONSE", res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const changeDataType = (type) => {
    setDataType(type);
  };

  const getData = (type, emp_no, dept_name, title) => {
    //axios로 history data요청.

    getApiData(type, emp_no, dept_name, title);
    console.log("GET panel data");
    // setData();
  };

  return [{ type: dataType, data: data }, changeDataType, getData];
};

export default useEmployeeData;
