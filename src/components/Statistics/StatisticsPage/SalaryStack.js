import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import DeptChart from "../Graph/SalaryStackChart/DeptChart";

const SalaryStack = () => {
  const { deptData, empData, type } = useSelector(
    (state) => ({
      deptData: state.statPage.deptData,
      empData: state.statPage.empData,
      type: state.statBar.selected ? state.statBar.selected.type : null,
    }),
    shallowEqual
  );

  const chart = () => {
    switch (type) {
      case "emp":
        return (
          <Grid container>
            <Grid item xs={false} sm={1}></Grid>
            <Grid item xs={12} sm={10}>
              {/* <> */}
            </Grid>
            <Grid item xs={false} sm={1}></Grid>
          </Grid>
        );

      case "dept":
        return (
          <Grid container>
            <Grid item xs={12} sm={10}>
              <DeptChart deptData={deptData} />
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return chart();
};

export default SalaryStack;
