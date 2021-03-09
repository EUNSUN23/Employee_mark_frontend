import React, { memo } from "react";
import SalaryStackChart from "./Graph/SalaryStackChart";
import { Grid } from "@material-ui/core";

const StatisticsPage = memo((props) => {
  const { data } = props;
  return (
    <Grid container direction="column" spacing={5}>
      <Grid item></Grid>
      <Grid item>
        <SalaryStackChart data={data} />
      </Grid>
    </Grid>
  );
});

export default StatisticsPage;
