import { useState } from "react";
import axios from "axios";

const useEmployeeData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataType, setDataType] = useState(null);
  const [data, setData] = useState();

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

  const getData = (panel, type, emp_no, dept_name, title) => {
    setData(getApiData(panel, type, emp_no, dept_name, title));
  };

  return [{ type: dataType, data: data, isLoading: isLoading }, getData];
};

export default useEmployeeData;
