import React, { useState, useEffect, memo } from "react";

const StatisticsPage = memo((props) => {
  const [sth, setSth] = useState();
  const { data } = props;

  console.log("STATISTICS PAGE", data);

  return (
    <>
      <h1>StatisticsPage</h1>
    </>
  );
});

export default StatisticsPage;
