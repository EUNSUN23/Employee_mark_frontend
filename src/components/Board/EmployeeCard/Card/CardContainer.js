import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import EmployeeCard from "../EmployeeCard";
import { debounce } from "lodash";
import { Grid } from "@material-ui/core";
import Loader from "../../../UI/Loader";
import { getEmpData } from "../../../../store/actions/searchEmp";
import { getCurrent } from "../../../../shared/utility";
import BoardBackground from "../../BoardBackground";

const CardContainer = () => {
  const dispatch = useDispatch();

  const employeeData = useSelector((state) => state.searchEmp.employeeData);
  const page = useSelector((state) => state.searchEmp.page);
  const isNextLoading = useSelector((state) => state.searchEmp.nextLoading);

  const currentEmp = useSelector(
    (state) => state.searchEmp.openedEmp && state.searchEmp.openedEmp.emp_no,
    shallowEqual
  );

  const nextPage = useRef(page);
  const target = useRef(null);

  const loadItems = debounce(
    (entry, observer) => {
      const currentData = getCurrent();
      console.log("currentData", currentData);
      dispatch(getEmpData(currentData, page, "intersected"));
      nextPage.current = page;
      observer.unobserve(entry.target);
      observer.observe(target.current);
    },
    [200]
  );

  const handleIntersection = (entries, observer) => {
    console.log("intersection");
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
    console.log("card container useEffect");
    let io;
    if (isNextLoading) {
      return;
    } else {
      io = new IntersectionObserver(handleIntersection, options);
      if (target.current) {
        io.observe(target.current);
      }
    }

    return () => io && io.disconnect();
  });

  const createEmployeeList = (employeeData, current) => {
    if (!employeeData) {
      return <BoardBackground />;
    }
    const employeeList = employeeData.map((el, idx) => {
      const lastEl = idx === employeeData[employeeData.length - 1].id;

      return (
        <Grid
          key={"employee" + idx}
          item
          xs={10}
          sm={12}
          md={6}
          ref={lastEl ? target : null}
        >
          <EmployeeCard {...el.employee} currentEmp={current} />
        </Grid>
      );
    });

    return employeeList;
  };

  return (
    <>
      <Grid container spacing={4} justify="center">
        {createEmployeeList(employeeData, currentEmp)}
      </Grid>
      {isNextLoading ? <Loader type="medium" /> : null}
    </>
  );
};

export default CardContainer;
