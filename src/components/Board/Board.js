import React, { useEffect, useState, useCallback } from "react";
import { Grid } from "@material-ui/core";
import SearchBar from "../SearchBar/SearchBar";
import CardContainer from "./EmployeeCard/Card/CardContainer";
import employeeList from "../../constants";
import EmployeeCard from "./EmployeeCard/EmployeeCard";
import ScrollToTop from "../ScrollToTop";

const Board = (props) => {
  const [employeeCards, setEmployeeCards] = useState(null);
  const { location, initPage } = props;
  const [scrollToTop, setScrollToTop] = useState(null);
  //기본 직원정보 : 이름, 부서, 직급, 퇴사여부

  const handleScroll = (e) => {
    const scrollTop = ("scroll", e.srcElement.scrollingElement.scrollTop);
    scrollTop < 200 && scrollTop >= 0
      ? setScrollToTop(false)
      : setScrollToTop(true);
  };

  useEffect(() => {
    if (scrollToTop === null) {
      initPage();
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollToTop]);

  const createEmployeeList = (employeeData) => {
    return employeeData.map((employee, idx) => {
      return (
        <Grid key={"employee" + idx} item xs={12}>
          <EmployeeCard {...employee} />
        </Grid>
      );
    });
  };

  const onSearchHandler = useCallback(() => {
    const data = employeeList.slice();
    setEmployeeCards(createEmployeeList(data));
  }, []);

  const handleOnScrollBtn = useCallback(() => {
    console.log("scroll to top");
    setScrollToTop(false);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
        <div>
          <ScrollToTop
            onScroll={(e) => handleScroll(e)}
            show={scrollToTop}
            handleOnScrollBtn={handleOnScrollBtn}
          />
        </div>
      </Grid>
    </>
  );
};

export default Board;
