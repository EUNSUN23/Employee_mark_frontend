import React, { useState, useEffect, memo } from "react";

import { Grid } from "@material-ui/core";

const CardContainer = memo((props) => {
  const { employeeCards } = props;

  return (
    <Grid container spacing={4}>
      {employeeCards}
    </Grid>
  );
});

export default CardContainer;
