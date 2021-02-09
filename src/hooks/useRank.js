import React, { useState } from "react";

const useRank = () => {
  const [rankType, setRankType] = useState("stead");
  const [rankData, setRankData] = useState();

  const getRankData = (rank) => {
    setRankData(rank);
  };

  const changeRankType = (type) => {
    setRankType(type);
  };

  return [{ type: rankType, data: rankData }, changeRankType, getRankData];
};

export default useRank;
