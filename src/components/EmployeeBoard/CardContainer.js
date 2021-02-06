import React from "react";
import EmployeeCard from "./EmployeeCard";
import { Grid } from "@material-ui/core";
import employeeList from "../../constants";

const CardContainer = () => {
  const getEmployeeList = (employee) => {
    return (
      <Grid item xs={12}>
        <EmployeeCard {...employee} />
      </Grid>
    );
  };
  return (
    <Grid container spacing={4}>
      {/*spacing 1의 크기도 default theme에 정의되어 있음. 8px. */}

      {employeeList.map((employee) => {
        return getEmployeeList(employee);
      })}
    </Grid>
  );
};

export default CardContainer;
