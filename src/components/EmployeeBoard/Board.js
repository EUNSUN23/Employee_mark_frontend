import React from "react";
import { Grid } from "@material-ui/core";
import CardContainer from "./CardContainer";

const Board = () => {
  return (
    <Grid container direction="column">
      <Grid item></Grid>
      {/*item인 동시에 container역할 할 수 있다*/}
      <Grid item container>
        {/*xs:화면크기가 extra small(default theme에 정의된 대로) 일 때 grid가 차지하는 공간크기*/}
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
