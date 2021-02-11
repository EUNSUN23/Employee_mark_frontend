import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import SearchBar from "../SearchBar/SearchBar";
import CardContainer from "./EmployeeCard/Card/CardContainer";
import employeeList from "../../constants";
import EmployeeCard from "./EmployeeCard/EmployeeCard";

const Board = (props) => {
  const [employeeCards, setEmployeeCards] = useState(null);
  const { location, initPage } = props;
  //기본 직원정보 : 이름, 부서, 직급, 퇴사여부

  const createEmployeeList = (employeeData) => {
    return employeeData.map((employee, idx) => {
      return (
        <Grid key={"employee" + idx} item xs={12}>
          <EmployeeCard {...employee} />
        </Grid>
      );
    });
  };

  const onSearchHandler = () => {
    const data = employeeList.slice();
    setEmployeeCards(createEmployeeList(data));
  };

  useEffect(() => {
    initPage();
  }, []);

  return (
    <>
      <SearchBar location={location} onSearchHandler={onSearchHandler} />
      <Grid container direction="column" spacing={10}>
        <Grid item></Grid>
        <Grid item container>
          <Grid item xs={false} sm={2} />
          <Grid item xs={12} sm={8}>
            <CardContainer employeeCards={employeeCards} />
          </Grid>
          <Grid item xs={false} sm={2} />
        </Grid>
      </Grid>
    </>
  );
};

export default Board;
