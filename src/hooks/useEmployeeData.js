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
      url = `http://localhost:3008/api/emp/history/${emp_no}`;
    } else {
      const subType = type === "default" ? "period" : type;
      setDataType(subType);
      url = `http://localhost:3008/api/emp/rank/${subType}/${emp_no}/${dept_name}/${title}`;
      console.log(url);
    }
    try {
      setIsLoading(true);
      const res = await axios.get(url);
      result = res.data.packet;
      console.log(res);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
    if (result) {
      if (panel === "history") {
        console.log("history result", result);
        const transfer = result[0];
        const dept_history = result.splice(1, transfer);
        const salary_history = result.slice(1);
        const historyResult = { dept: dept_history, salary: salary_history };
        console.log("History___Result", historyResult);
        setData(historyResult);
      } else {
        setData(result);
      }

      setIsLoading(false);
    }
  };

  const getData = (panel, type, emp_no, dept_name, title) => {
    getApiData(panel, type, emp_no, dept_name, title);
  };

  return [{ type: dataType, data: data, isLoading: isLoading }, getData];
};

export default useEmployeeData;
