import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import DistBar from "../Graph/SalaryDist/DistBar";
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
  const { aboveData, belowData, area } = useSelector(
    (state) => ({
      aboveData: state.statPage.aboveData,
      belowData: state.statPage.belowData,
      area: state.statBar.area,
    }),
    shallowEqual
  );

  const makeDistBar = (area) => {
    if (!area) return null;
    let data;
    if (area.type) {
      data = area.type === "below" ? belowData : aboveData;
      if (!data) {
        return null;
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
