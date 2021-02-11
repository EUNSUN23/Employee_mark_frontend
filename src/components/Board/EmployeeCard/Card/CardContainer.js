import React, { useState } from "react";
import EmployeeCard from "../EmployeeCard";
import { Grid } from "@material-ui/core";
import employeeList from "../../../../constants";
import ScrollToTop from "../../../ScrollToTop";

const CardContainer = () => {
  const [show, setShow] = useState(true);
  const getEmployeeList = (employee) => {
    return (
      <Grid item xs={12}>
        <EmployeeCard {...employee} />
      </Grid>
    );
  };

  const handleOnScrollBtn = () => {
    console.log("scroll to top");
    setShow(false);
  };
  return (
    <>
      <Grid container spacing={4}>
        {employeeList.map((employee) => {
          return getEmployeeList(employee);
        })}

        <ScrollToTop show={show} handleOnScrollBtn={handleOnScrollBtn} />
      </Grid>
    </>
  );
};

export default CardContainer;
