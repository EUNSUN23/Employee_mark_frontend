import React, { useState, useEffect } from "react";
import EmployeeCard from "../EmployeeCard";
import { Grid } from "@material-ui/core";
import employeeList from "../../../../constants";
import ScrollToTop from "../../../ScrollToTop";

const CardContainer = () => {
  const [show, setShow] = useState(false);

  const handleScroll = (e) => {
    const scrollTop = ("scroll", e.srcElement.scrollingElement.scrollTop);
    scrollTop < 200 && scrollTop >= 0 ? setShow(false) : setShow(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [show]);

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
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  return (
    <div onScroll={(e) => handleScroll(e)}>
      {" "}
      <Grid container spacing={4}>
        {employeeList.map((employee) => {
          return getEmployeeList(employee);
        })}

        <ScrollToTop show={show} handleOnScrollBtn={handleOnScrollBtn} />
      </Grid>
    </div>
  );
};

export default CardContainer;
