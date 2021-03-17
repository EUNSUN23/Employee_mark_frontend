import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import DeptChart from "../../Graph/SalaryStackChart/DeptChart";
import EmpChart from "../../Graph/SalaryStackChart/EmpChart";

const SalaryStack = () => {
  const selected = useSelector((state) => state.statBar.selected.type);

  const salaryStack =
    selected === "dept" ? (
      <DeptChart />
    ) : (
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <EmpChart />
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    );

  return salaryStack;
};

export default SalaryStack;
