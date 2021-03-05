import React, { useState, useEffect, memo } from "react";
import SalaryStackChart from "../../SalaryStackChart";

const StatisticsPage = memo((props) => {
  const [sth, setSth] = useState();
  const { data } = props;

  console.log("STATISTICS PAGE", data);
  console.log(data);

  return (
    <>
      <SalaryStackChart data={data} />
    </>
  );
});

export default StatisticsPage;
