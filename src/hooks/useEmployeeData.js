import { useState } from "react";
import axios from "axios";

const useEmployeeData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataType, setDataType] = useState(null);
  const [data, setData] = useState();

  /*패널 내부 데이터 종류 변경 */
  // /api/emp/rank/salary/:emp_no/:dept_name/:title 랭크_연봉
  // /api/emp/rank/period/:emp_no/:dept_name/:title 랭크_근속
  const getApiData = async (panel, type, emp_no, dept_name, title) => {
    let url;
    let result;
    if (panel === "history") {
      console.log("history");
    } else {
      const subType = type === "default" ? "period" : type;
      setDataType(subType);
      url = `http://localhost:3008/api/emp/rank/${subType}/${emp_no}/${dept_name}/${title}`;
    }
    try {
      setIsLoading(true);
      const res = await axios.get(url);
      console.log(res.data.packet);
      result = res.data.packet;
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
    if (result) {
      setData(result);
      setIsLoading(false);
    }
  };

  const changeDataType = (type) => {
    setDataType(type);
  };

  const getData = (panel, type, emp_no, dept_name, title) => {
    setData(getApiData(panel, type, emp_no, dept_name, title));
  };

  return [
    { type: dataType, data: data, isLoading: isLoading },
    changeDataType,
    getData,
  ];
};

export default useEmployeeData;
