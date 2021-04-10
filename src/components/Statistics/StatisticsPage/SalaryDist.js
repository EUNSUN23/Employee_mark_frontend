import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import DistBar from "../Graph/SalaryDist/DistBar";
import { Grid } from "@material-ui/core";
import StatBackground from "../StatBackground";

const SalaryDist = () => {
  const { aboveData, belowData, area } = useSelector(
    (state) => ({
      aboveData: state.statPage.aboveData,
      belowData: state.statPage.belowData,
      area: state.statBar.area,
    }),
    shallowEqual
  );

  const makeDistBar = (area) => {
    if (!area) return <StatBackground />;
    let data;
    if (area.type) {
      data = area.type === "below" ? belowData : aboveData;
      if (!data) {
        return <StatBackground />;
      } else {
        return (
          <Grid container>
            <Grid item xs={false} sm={1}></Grid>
            <Grid item xs={12} sm={10}>
              <DistBar data={data} type={area.type} salary={area.salary} />
            </Grid>
            <Grid item xs={false} sm={1}></Grid>
          </Grid>
        );
      }
    }
  };

  return makeDistBar(area);
};

export default SalaryDist;
