import React from "react";
import { useSelector } from "react-redux";

const SalaryDist = () => {
  const data = useSelector((state) => state.statPage.areaData);
  console.log(data);
  return <div>SalaryDist</div>;
};

export default SalaryDist;
