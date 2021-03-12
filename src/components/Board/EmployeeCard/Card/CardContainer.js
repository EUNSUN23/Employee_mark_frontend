import React, { useEffect, memo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import EmployeeCard from "../EmployeeCard";
import { debounce } from "lodash";
import { Grid } from "@material-ui/core";
import Loader from "../../../UI/Loader";

const CardContainer = memo(() => {
  // const { employeeData, page, getEmployeeData, isNextLoading } = props;
  const dispatch = useDispatch();

  const employeeData = useSelector((state) => state.searchEMP.employeeData);
  const page = useSelector((state) => state.searchEMP.page);
  const isNextLoading = useSelector((state) => state.searchEMP.nextLoading);

  const nextPage = useRef(page);
  const target = useRef(null);

  const loadItems = debounce(
    (entry, observer) => {
      const currentData = JSON.parse(localStorage.getItem("CURRENT_KEY"));
      console.log("currentData", currentData);
      // getEmployeeData(currentData, page, "intersected");
      nextPage.current = page;
      observer.unobserve(entry.target);
      observer.observe(target.current);
    },
    [500]
  );

  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      loadItems(entry, observer);
    });
  };

  const options = {
    threshold: 1,
  };

  useEffect(() => {
    let io;
    if (nextPage.current === page || isNextLoading) {
      return;
    } else {
      io = new IntersectionObserver(handleIntersection, options);
      if (target.current) {
        io.observe(target.current);
      }
    }

    return () => io && io.disconnect();
  });

  const createEmployeeList = (employeeData) => {
    if (!employeeData) {
      return;
    }
    const employeeList = employeeData.map((el, idx) => {
      const lastEl = idx === employeeData[employeeData.length - 1].id;

      return (
        <Grid
          key={"employee" + idx}
          item
          xs={12}
          sm={6}
          ref={lastEl ? target : null}
        >
          <EmployeeCard {...el.employee} />
        </Grid>
      );
    });

    return employeeList;
  };

  return (
    <>
      <Grid container spacing={4}>
        {createEmployeeList(employeeData)}
      </Grid>
      {isNextLoading ? <Loader size="medium" /> : null}
    </>
  );
});

export default CardContainer;
