import React from "react";
import { Grid } from "@material-ui/core";
import CardContainer from "../EmployeeBoard/EmployeeCard/Card/CardContainer";

const Board = () => {
  return (
    <Grid container direction="column">
      <Grid item></Grid>
      <Grid item container>
        <Grid item xs={false} sm={2} />
        <Grid item xs={12} sm={8}>
          <CardContainer />
        </Grid>
        <Grid item xs={false} sm={2} />
      </Grid>
    </Grid>
  );
};

export default Board;
