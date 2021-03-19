import React from "react";
import { useSelector } from "react-redux";
import DistPie from "../Graph/SalaryDist/DistPie";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  title: {
    color: "#333",
  },
  distPie: {
    margin: "0 auto",
  },
}));

const SalaryDist = () => {
  const classes = useStyles();
  const belowData = useSelector((state) => state.statPage.belowData);
  const aboveData = useSelector((state) => state.statPage.aboveData);
  const area = useSelector((state) => state.statBar.area);

  const data = area && area.type === "below" ? belowData : aboveData;
  const makeTitle = () => {
    if (!area) return;
    const range = area.type === "below" ? "이하" : "이상";
    const salary = area.salary;

    return `$${salary} ${range} 연봉을 받는 부서별 직원 수 분포`;
  };

  const salaryDist = data ? (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={3}
    >
      <Grid item></Grid>
      <Grid item>
        <h2 className={classes.title}>{makeTitle()}</h2>
      </Grid>
      <Grid item className={classes.distPie}>
        <DistPie data={data} />
      </Grid>
    </Grid>
  ) : null;

  return salaryDist;
};

export default SalaryDist;
