import { useState } from "react";
import axios from "axios";

const useEmployeeData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataType, setDataType] = useState(null);
  const [data, setData] = useState();

  /*패널 내부 데이터 종류 변경 */

  const getApiData = async (type, emp_no, dept_name, title) => {
    let data;
    const url =
      type === "history"
        ? `http://localhost:3008/api/emp/history/${emp_no}`
        : `http://localhost:3008/api/emp/rank/${emp_no}/${dept_name}/${title}`;

    try {
      setIsLoading(true);
      const res = await axios.get(url);
      console.log(res.data.packet);
      data = res.data.packet;
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
    if (data) {
      setData(data);
      setIsLoading(false);
    }
  };

  const changeDataType = (type) => {
    setDataType(type);
  };

  const getData = (type, emp_no, dept_name, title) => {
    setData(getApiData(type, emp_no, dept_name, title));
  };

  return [
    { type: dataType, data: data, isLoading: isLoading },
    changeDataType,
    getData,
  ];
};

export default useEmployeeData;
