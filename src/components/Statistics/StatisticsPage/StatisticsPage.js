import React, { memo } from "react";
import { useSelector } from "react-redux";
import SalaryStack from "./components/SalaryStack";
import SalaryDist from "./components/SalaryDist";
import { Grid } from "@material-ui/core";

const StatisticsPage = memo(() => {
  const optionDetail = useSelector((state) => state.statBar.optionDetail);

  // StatisticsPage > SalaryStack > selected('전체'/'부서')에 따라서 EmpChart, DeptChart나누기(Graph의 SalaryStack에서 불러옴)

  const contents = () => {
    switch (optionDetail) {
      case "조직":
        return <SalaryStack />;
      case "급여":
        return <SalaryDist />;
      default:
        return null;
    }
  };

  return (
    <Grid container direction="column" spacing={5}>
      <Grid item></Grid>
      <Grid item>{contents}</Grid>
    </Grid>
  );
});

export default StatisticsPage;
