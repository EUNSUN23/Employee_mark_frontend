import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import DeptChart from "../Graph/SalaryStackChart/DeptChart";
import EmpChart from "../Graph/SalaryStackChart/EmpChart";

const SalaryStack = () => {
  const type = useSelector((state) => {
    const selected = state.statBar.selected;
    return selected ? state.statBar.selected.type : null;
  });

  // const empData = useSelector((state) => state.statPage.empData);
  console.log("SalaryStack", type);

  const chart = () => {
    switch (type) {
      case "emp":
        return <EmpChart />;
      case "dept":
        return (
          <Grid container>
            <Grid item xs={false} sm={1}></Grid>
            <Grid item xs={12} sm={10}>
              <DeptChart />
            </Grid>
            <Grid item xs={false} sm={1}></Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return chart();
};

export default SalaryStack;
