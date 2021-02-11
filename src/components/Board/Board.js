import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import SearchBar from "../SearchBar/SearchBar";
import CardContainer from "./EmployeeCard/Card/CardContainer";

const Board = (props) => {
  const { location, initPage } = props;
  //기본 직원정보 : 이름, 부서, 직급, 퇴사여부

  useEffect(() => {
    initPage();
  }, []);

  return (
    <>
      <SearchBar location={location} />
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
    </>
  );
};

export default Board;
