import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import DeptChart from "../../Graph/SalaryStackChart/DeptChart";
import EmpChart from "../../Graph/SalaryStackChart/EmpChart";

const SalaryStack = () => {
  const selected = useSelector((state) => state.statBar.selected);

  const salaryStack =
    selected === "dept" ? (
      <Grid container spacing={2} className={classes.chartContainer}>
        <DeptChart />
        <Grid item>
          <ChartSelect onCheckHandler={chartSelectHandler} checked={checked} />
        </Grid>
      </Grid>
    ) : (
      <Grid container>
        <Grid item xs={1}></Grid>
        <EmpChart />
        <Grid item xs={1}></Grid>
      </Grid>
    );

  return salaryStack;
};

export default SalaryStack;
