import React, { useState, useEffect } from "react";
import EmployeeCard from "../EmployeeCard";
import { Grid } from "@material-ui/core";
import employeeList from "../../../../constants";
import ScrollToTop from "../../../ScrollToTop";

const CardContainer = () => {
  const [show, setShow] = useState(null);
  const [employeeCards, setEmployeeCards] = useState(null);

  const initEmployeeCards = () => {
    const employeeData = employeeList.slice();
    console.log("initEmployeeCards", employeeData);
    const getEmployeeList = (data) => {
      return data.map((employee, idx) => {
        return (
          <Grid key={"employee" + idx} item xs={12}>
            <EmployeeCard {...employee} />
          </Grid>
        );
      });
    };
    setEmployeeCards(getEmployeeList(employeeData));
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    if (employeeCards === null && show === null) {
      initEmployeeCards();
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [show]);

  const handleScroll = (e) => {
    const scrollTop = ("scroll", e.srcElement.scrollingElement.scrollTop);
    scrollTop < 200 && scrollTop >= 0 ? setShow(false) : setShow(true);
  };

  const handleOnScrollBtn = () => {
    console.log("scroll to top");
    setShow(false);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  return (
    <div onScroll={(e) => handleScroll(e)}>
      <Grid container spacing={4}>
        {employeeCards}
        <ScrollToTop show={show} handleOnScrollBtn={handleOnScrollBtn} />
      </Grid>
    </div>
  );
};

export default CardContainer;
