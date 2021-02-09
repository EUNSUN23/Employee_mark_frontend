import React, { useState } from "react";

const useHistory = () => {
  const [historyType, setHistoryType] = useState("dept");
  const [historyData, setHistoryData] = useState();

  const changeHistoryType = (type) => {
    setHistoryType(type);
  };

  const getHistoryData = (data) => {
    //axios로 history data요청.
    setHistoryData(data);
  };

  return [
    { type: historyType, data: historyData },
    changeHistoryType,
    getHistoryData,
  ];
};

export default useHistory;
